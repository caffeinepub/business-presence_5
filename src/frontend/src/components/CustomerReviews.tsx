import { Star, Loader2 } from 'lucide-react';
import { useGetAllRatings } from '../hooks/useQueries';
import type { Rating } from '../backend';

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= value
              ? 'fill-accent text-accent'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ rating }: { rating: Rating }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display text-xl font-semibold text-foreground">
          {rating.customerName}
        </h4>
        <StarRating value={Number(rating.ratingValue)} />
      </div>
      <p className="font-body text-muted-foreground leading-relaxed">
        "{rating.comment}"
      </p>
    </div>
  );
}

export default function CustomerReviews() {
  const { data: ratings, isLoading, isError } = useGetAllRatings();

  // Don't render if no ratings or error
  if (isError || (!isLoading && (!ratings || ratings.length === 0))) {
    return null;
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="font-body text-sm font-semibold tracking-[0.16em] uppercase text-accent mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who've brought warmth and light into their homes with our handcrafted candles.
          </p>
        </div>

        {/* Reviews grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratings?.map((rating) => (
              <ReviewCard key={Number(rating.id)} rating={rating} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

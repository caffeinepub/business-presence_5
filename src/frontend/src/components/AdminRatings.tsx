import { useState } from 'react';
import { Loader2, Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import { useGetAllRatings, useAddRating, useUpdateRating, useDeleteRating } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import type { Rating } from '../backend';

interface RatingFormData {
  customerName: string;
  ratingValue: number;
  comment: string;
}

function StarRatingDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= value
              ? 'fill-accent text-accent'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminRatings() {
  const { data: ratings, isLoading, isError } = useGetAllRatings();
  const addRatingMutation = useAddRating();
  const updateRatingMutation = useUpdateRating();
  const deleteRatingMutation = useDeleteRating();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRating, setEditingRating] = useState<Rating | null>(null);
  const [formData, setFormData] = useState<RatingFormData>({
    customerName: '',
    ratingValue: 5,
    comment: '',
  });

  const handleOpenForm = (rating?: Rating) => {
    if (rating) {
      setEditingRating(rating);
      setFormData({
        customerName: rating.customerName,
        ratingValue: Number(rating.ratingValue),
        comment: rating.comment,
      });
    } else {
      setEditingRating(null);
      setFormData({
        customerName: '',
        ratingValue: 5,
        comment: '',
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingRating(null);
    setFormData({
      customerName: '',
      ratingValue: 5,
      comment: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      toast.error('Please enter a customer name');
      return;
    }

    if (!formData.comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      if (editingRating) {
        await updateRatingMutation.mutateAsync({
          id: editingRating.id,
          customerName: formData.customerName,
          ratingValue: formData.ratingValue,
          comment: formData.comment,
        });
        toast.success('Rating updated successfully');
      } else {
        await addRatingMutation.mutateAsync({
          customerName: formData.customerName,
          ratingValue: formData.ratingValue,
          comment: formData.comment,
        });
        toast.success('Rating added successfully');
      }
      handleCloseForm();
    } catch (error) {
      toast.error(editingRating ? 'Failed to update rating' : 'Failed to add rating');
      console.error(error);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this rating?')) {
      return;
    }

    try {
      await deleteRatingMutation.mutateAsync(id);
      toast.success('Rating deleted successfully');
    } catch (error) {
      toast.error('Failed to delete rating');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load ratings. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Customer Ratings
          </h1>
          <p className="font-body text-muted-foreground">
            Manage customer reviews and testimonials
          </p>
        </div>
        <Button
          onClick={() => handleOpenForm()}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Rating
        </Button>
      </div>

      {/* Ratings list */}
      {ratings && ratings.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No ratings yet</p>
            <Button
              onClick={() => handleOpenForm()}
              variant="outline"
            >
              Add Your First Rating
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {ratings?.map((rating) => (
            <Card key={Number(rating.id)} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-display">
                      {rating.customerName}
                    </CardTitle>
                    <div className="mt-2">
                      <StarRatingDisplay value={Number(rating.ratingValue)} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenForm(rating)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(rating.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-muted-foreground">
                  "{rating.comment}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingRating ? 'Edit Rating' : 'Add New Rating'}
            </DialogTitle>
            <DialogDescription>
              {editingRating
                ? 'Update the customer review details below'
                : 'Add a new customer review to display on your website'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, customerName: e.target.value }))
                  }
                  placeholder="e.g. Priya Sharma"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ratingValue">Rating</Label>
                <Select
                  value={String(formData.ratingValue)}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, ratingValue: Number(value) }))
                  }
                >
                  <SelectTrigger id="ratingValue">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((val) => (
                      <SelectItem key={val} value={String(val)}>
                        <div className="flex items-center gap-2">
                          <span>{val}</span>
                          <StarRatingDisplay value={val} />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, comment: e.target.value }))
                  }
                  placeholder="Write what the customer said about your candles..."
                  rows={4}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseForm}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addRatingMutation.isPending || updateRatingMutation.isPending}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {(addRatingMutation.isPending || updateRatingMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingRating ? 'Update' : 'Add'} Rating
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { useRef, useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

const STORAGE_KEY = 'ownerPhotoCustom';
const DEFAULT_PHOTO = '/assets/generated/owner-photo.dim_256x256.png';

export default function OwnerPhoto() {
  const [photoSrc, setPhotoSrc] = useState<string>(DEFAULT_PHOTO);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved photo from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPhotoSrc(saved);
    }
  }, []);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPhotoSrc(dataUrl);
        localStorage.setItem(STORAGE_KEY, dataUrl);
      }
    };
    reader.readAsDataURL(file);

    // Reset input so the same file can be re-selected if needed
    e.target.value = '';
  };

  return (
    <div
      className="fixed top-20 right-4 z-40 flex flex-col items-center gap-1.5"
      aria-label="Owner photo"
    >
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleEditClick}
        title="Click to change photo"
      >
        {/* Decorative glow ring */}
        <div className="absolute inset-0 rounded-full bg-accent/30 blur-md scale-110 pointer-events-none" />

        <img
          src={photoSrc}
          alt="Arpan Ghosh – Owner, Melt & Glow"
          className="relative w-16 h-16 rounded-full object-cover border-2 border-accent shadow-lg"
          style={{ boxShadow: '0 4px 18px 0 rgba(0,0,0,0.18)' }}
        />

        {/* Edit overlay on hover/tap */}
        <div
          className={`absolute inset-0 rounded-full flex items-center justify-center bg-black/50 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Camera className="w-5 h-5 text-white" strokeWidth={2} />
        </div>
      </div>

      <span
        className="font-body text-[10px] font-semibold text-foreground/80 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-sand-dark/20 whitespace-nowrap"
      >
        Arpan Ghosh
      </span>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        aria-label="Change owner photo"
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ImageGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean[]>(
    new Array(images.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setIsLoading((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Preload images
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image;
      img.onload = () => handleImageLoad(index);
    });
  }, [images]);

  if (!images.length) return null;

  return (
    <div className="w-full h-full">
      {/* Main image display */}
      <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden rounded-xl mb-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              "absolute inset-0 transition-all duration-500 ease-in-out",
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 bg-muted/20 transition-opacity duration-300",
                isLoading[index] ? "opacity-100" : "opacity-0"
              )}
            />
            <img
              src={image}
              alt={image.alt}
              className={cn(
                "w-full h-full object-cover image-load-transition",
                isLoading[index] ? "image-loading" : "image-loaded"
              )}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all hover:bg-background"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md transition-all hover:bg-background"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="hidden sm:grid grid-flow-col auto-cols-fr gap-2 w-full mt-4">
        {images.map((image, index) => (
          <button
            key={`thumb-${image.id}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative h-20 w-full overflow-hidden rounded-md transition-all duration-200",
              activeIndex === index
                ? "ring-2 ring-primary"
                : "opacity-70 hover:opacity-100"
            )}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Dots for mobile */}
      <div className="flex sm:hidden justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-200",
              activeIndex === index
                ? "bg-primary w-4"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

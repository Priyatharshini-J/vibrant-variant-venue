
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

interface RelatedProductsProps {
  title?: string;
  subtitle?: string;
  products: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    images: { url: string; alt: string }[];
    isNew?: boolean;
    isSale?: boolean;
    isLimitedEdition?: boolean;
    rating?: number;
    availableColors?: { hex: string; name: string }[];
  }>;
}

const RelatedProducts = ({ 
  title = 'You may also like', 
  subtitle,
  products 
}: RelatedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    checkScrollability();
    container.addEventListener('scroll', checkScrollability);
    window.addEventListener('resize', checkScrollability);
    
    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="w-full py-16">
      {/* Heading */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="h3">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {/* Navigation arrows (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center transition-all",
              canScrollLeft
                ? "bg-background border border-border hover:bg-muted"
                : "bg-muted/50 text-muted-foreground cursor-not-allowed"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center transition-all",
              canScrollRight
                ? "bg-background border border-border hover:bg-muted"
                : "bg-muted/50 text-muted-foreground cursor-not-allowed"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Products slider */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 -mx-4 px-4 gap-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[240px] sm:min-w-[280px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div 
          className={cn(
            "absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
        />
        <div 
          className={cn(
            "absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
        />
      </div>
      
      {/* Navigation arrows (mobile) */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-6">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center transition-all",
            canScrollLeft
              ? "bg-background border border-border hover:bg-muted"
              : "bg-muted/50 text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center transition-all",
            canScrollRight
              ? "bg-background border border-border hover:bg-muted"
              : "bg-muted/50 text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;

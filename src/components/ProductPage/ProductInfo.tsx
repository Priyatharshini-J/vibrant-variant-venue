
import { useState } from 'react';
import { ShoppingBag, Heart, Share2, Check, Star } from 'lucide-react';
import { toast } from 'sonner';
import VariantSelector from './VariantSelector';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    description: string;
    details: string[];
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isSale?: boolean;
    isLimitedEdition?: boolean;
  };
  variants: {
    colors: {
      id: string;
      label: string;
      value: string;
      hex: string;
      available: boolean;
    }[];
    sizes: {
      id: string;
      label: string;
      value: string;
      available: boolean;
    }[];
  };
}

const ProductInfo = ({ product, variants }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(variants.colors[0]?.value || '');
  const [selectedSize, setSelectedSize] = useState(variants.sizes[0]?.value || '');
  const [quantity, setQuantity] = useState(1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    toast.success('Added to your cart!', {
      description: `${product.name} - ${variants.colors.find(c => c.value === selectedColor)?.label}, ${variants.sizes.find(s => s.value === selectedSize)?.label}`,
      action: {
        label: 'View Cart',
        onClick: () => console.log('View cart clicked')
      }
    });
  };

  const handleAddToWishlist = () => {
    toast('Added to wishlist', {
      description: product.name,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Link copied to clipboard', {
      description: 'Now you can share it with your friends',
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Brand and name */}
      <div className="space-y-1">
        <div className="flex flex-wrap gap-2 mb-2">
          {product.isNew && (
            <Badge variant="secondary" className="font-medium">New Arrival</Badge>
          )}
          {product.isSale && (
            <Badge variant="destructive" className="font-medium">Sale</Badge>
          )}
          {product.isLimitedEdition && (
            <Badge variant="outline" className="font-medium">Limited Edition</Badge>
          )}
        </div>
        <h2 className="font-medium uppercase tracking-wide text-sm text-muted-foreground">
          {product.brand}
        </h2>
        <h1 className="h2 mt-1">{product.name}</h1>
        
        {/* Price */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-2xl font-medium">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  "text-muted-foreground/70",
                  i < Math.floor(product.rating) && "text-amber-400 fill-amber-400",
                  i === Math.floor(product.rating) && product.rating % 1 > 0 && "text-amber-400 fill-amber-400"
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Color selector */}
      <VariantSelector
        label="Color"
        options={variants.colors}
        selectedValue={selectedColor}
        onChange={setSelectedColor}
        variant="color"
      />

      {/* Size selector */}
      <VariantSelector
        label="Size"
        options={variants.sizes}
        selectedValue={selectedSize}
        onChange={setSelectedSize}
        variant="size"
      />

      {/* Quantity selector */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Quantity</label>
        <div className="flex h-10 w-32">
          <button
            type="button"
            onClick={decrementQuantity}
            className="flex-1 flex items-center justify-center border rounded-l-md border-r-0 transition-colors hover:bg-muted"
          >
            -
          </button>
          <div className="flex-1 flex items-center justify-center border-y">
            {quantity}
          </div>
          <button
            type="button"
            onClick={incrementQuantity}
            className="flex-1 flex items-center justify-center border rounded-r-md border-l-0 transition-colors hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          onClick={handleAddToCart}
          className="flex-1 h-12 text-base bg-primary hover:bg-primary/90 group"
        >
          <ShoppingBag size={18} className="mr-2 transition-transform group-hover:scale-110" />
          Add to Cart
        </Button>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12"
            onClick={handleAddToWishlist}
          >
            <Heart size={18} className="transition-colors hover:fill-destructive hover:text-destructive" />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12"
            onClick={handleShare}
          >
            <Share2 size={18} />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="pt-8 border-t space-y-4">
        <h3 className="font-medium text-lg">Product Details</h3>
        <ul className="space-y-2">
          {product.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
              <Check size={18} className="shrink-0 mt-0.5 text-primary" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Free shipping */}
      <div className="flex items-center gap-2 text-sm py-3 px-4 bg-secondary rounded-md">
        <Check size={16} className="text-primary" />
        <span>Free shipping on orders over $100</span>
      </div>
    </div>
  );
};

export default ProductInfo;

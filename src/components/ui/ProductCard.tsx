import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductCard = ({ product, size = "md" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast("Added to cart", {
      description: product.name,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast("Added to wishlist", {
      description: product.name,
    });
  };

  const imageSizeClass = {
    sm: "h-48",
    md: "h-64",
    lg: "h-80",
  }[size];

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block w-full rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg mb-3",
          imageSizeClass
        )}
      >
        {/* Loading placeholder */}
        <div
          className={cn(
            "absolute inset-0 bg-muted/20 transition-opacity duration-500",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Images */}
        <img
          src={mainImage}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 image-load-transition",
            isHovered ? "opacity-0" : "opacity-100",
            imageLoaded ? "image-loaded" : "image-loading"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {hoverImage && (
          <img
            src={hoverImage}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0",
              imageLoaded ? "image-loaded" : "image-loading"
            )}
          />
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNew && (
            <Badge variant="secondary" className="font-medium">
              New
            </Badge>
          )}
          {product.isSale && discountPercentage > 0 && (
            <Badge variant="destructive" className="font-medium">
              -{discountPercentage}%
            </Badge>
          )}
          {product.isLimitedEdition && (
            <Badge
              variant="outline"
              className="backdrop-blur-sm bg-background/30 font-medium"
            >
              Limited
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div
          className={cn(
            "absolute inset-0 flex items-end justify-center p-3 bg-gradient-to-t from-background/70 via-background/20 to-transparent opacity-0 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex gap-2 w-full">
            <Button
              variant="default"
              size="sm"
              className="flex-1 group"
              onClick={handleAddToCart}
            >
              <ShoppingBag
                size={16}
                className="mr-2 group-hover:scale-110 transition-transform"
              />
              Add to cart
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm border-background/20 hover:bg-background"
              onClick={handleAddToWishlist}
            >
              <Heart size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-1 px-1">
        <div className="text-sm text-muted-foreground">{product.brand}</div>
        <h3 className="font-medium leading-tight">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-medium">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Available colors */}
        {product.availableColors && product.availableColors.length > 0 && (
          <div className="flex gap-1 pt-1">
            {product.availableColors.map((color, index) => (
              <div
                key={`${product.id}-color-${index}`}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.availableColors.length > 4 && (
              <div className="text-xs text-muted-foreground">
                +{product.availableColors.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;

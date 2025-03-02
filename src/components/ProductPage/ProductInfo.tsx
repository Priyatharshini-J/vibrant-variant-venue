
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import VariantSelector from './VariantSelector';
import AddToCartButton from './AddToCartButton';

type ProductInfoProps = {
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
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product, variants }) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    variants.sizes.find(size => size.available)?.value
  );
  
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    variants.colors.find(color => color.available)?.value
  );
  
  // Round the rating to the nearest 0.5
  const roundedRating = Math.round(product.rating * 2) / 2;
  
  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="flex flex-col space-y-6">
      {/* Brand & Product Name */}
      <div>
        <h4 className="text-sm text-muted-foreground font-medium">{product.brand}</h4>
        <h1 className="text-2xl md:text-3xl font-medium mt-1">{product.name}</h1>
      </div>
      
      {/* Rating */}
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(roundedRating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : i < roundedRating
                  ? 'text-yellow-400 fill-yellow-400' // Half star
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-muted-foreground">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>
      
      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <>
            <span className="text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            <span className="text-sm px-2 py-1 bg-red-100 text-red-700 font-medium rounded">
              Save {discountPercentage}%
            </span>
          </>
        )}
      </div>
      
      {/* Badges */}
      <div className="flex space-x-2">
        {product.isNew && (
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 font-medium rounded">
            New Arrival
          </span>
        )}
        {product.isSale && (
          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 font-medium rounded">
            Sale
          </span>
        )}
      </div>
      
      {/* Description */}
      <p className="text-muted-foreground">{product.description}</p>
      
      {/* Variant Selectors */}
      <div className="space-y-6">
        {/* Color Selector */}
        <div>
          <h3 className="font-medium mb-3">Color: {selectedColor && variants.colors.find(c => c.value === selectedColor)?.label}</h3>
          <VariantSelector
            variants={variants.colors}
            selected={selectedColor}
            onChange={setSelectedColor}
            type="color"
          />
        </div>
        
        {/* Size Selector */}
        <div>
          <div className="flex justify-between mb-3">
            <h3 className="font-medium">Size: {selectedSize && variants.sizes.find(s => s.value === selectedSize)?.label}</h3>
            <button className="text-sm text-primary">Size Guide</button>
          </div>
          <VariantSelector
            variants={variants.sizes}
            selected={selectedSize}
            onChange={setSelectedSize}
            type="size"
          />
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <div className="flex space-x-4 mt-2">
        <AddToCartButton 
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            images: [{ url: 'https://images.unsplash.com/photo-1581497396202-5645e76a3a8e', alt: product.name }]
          }}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          className="w-full py-6"
        />
      </div>
      
      {/* Product Details */}
      <div className="border-t border-border pt-6 mt-4">
        <h3 className="font-medium mb-3">Details</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          {product.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;

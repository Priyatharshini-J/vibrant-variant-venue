
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

type AddToCartButtonProps = {
  product: {
    id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
  };
  selectedColor?: string;
  selectedSize?: string;
  className?: string;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  selectedColor,
  selectedSize,
  className,
}) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    
    // Simulate network delay for a more realistic user experience
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].url,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
      
      setIsLoading(false);
    }, 600);
  };

  return (
    <Button 
      onClick={handleAddToCart} 
      className={className}
      disabled={isLoading}
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;

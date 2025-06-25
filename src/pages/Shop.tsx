import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import MultiSelectDropdown from "@/components/ui/multi-select";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  description: string;
  details: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isSale: boolean;
  images: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, isLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(300);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        "https://vibrant-variant-venue-routes-handler-10100989956.development.catalystappsail.com/getProducts"
      );
      setProducts(res.data);
      setFilteredProducts(res.data);
      isLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (maxPrice !== null) {
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, maxPrice, products, selectedBrands]);

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
        <section className="py-12">
          <h1 className="h1 mb-8">Shop</h1>
          <p className="p-large text-muted-foreground max-w-3xl mb-12">
            Discover our curated collection of timeless pieces, crafted with
            premium materials and exceptional attention to detail.
          </p>
        </section>
      </main>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-1/2">
          <Input
            className="pl-10 pr-4 py-2 rounded-lg shadow border border-gray-300"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <MultiSelectDropdown
            options={brands}
            selected={selectedBrands}
            onChange={setSelectedBrands}
          />

          <div className="ml-4">
            <p className="font-medium text-sm mb-2 text-gray-700">
              Max Price: ${maxPrice}
            </p>
            <Slider
              defaultValue={[maxPrice]}
              max={500}
              step={10}
              className="w-[200px]"
              onValueChange={(value) => setMaxPrice(value[0])}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const imageList = product.images.split(",");
          return (
            <Card key={product.id} className="group overflow-hidden">
              <img
                src={imageList[0]}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    {product.brand}
                  </span>
                  <div className="flex gap-1">
                    {product.isNew && <Badge variant="default">New</Badge>}
                    {product.isSale && (
                      <Badge variant="destructive">Sale</Badge>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star size={16} fill="currentColor" />
                  {product.rating} ({product.reviewCount})
                </div>
                <div className="mt-2 text-base font-semibold">
                  ${product.price.toFixed(2)}{" "}
                  {product.isSale && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-16">
          <p className="text-lg">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default Shop;

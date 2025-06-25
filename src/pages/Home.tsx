import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageTransition from "@/components/Layout/PageTransition";
import { Button } from "@/components/ui/button";

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

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://vibrant-variant-venue-routes-handler-10100989956.development.catalystappsail.com/getProducts"
        );
        console.log("data - ", res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        <div className="space-y-12 pb-20">
          {/* Hero Section */}
          <section className="w-full bg-gray-100 py-12 md:py-20 px-4 md:px-10 text-center">
            <br />
            <br />
            <br />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Discover Your Signature Style
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Browse curated fashion handpicked for modern lifestyles. Premium
              quality, fair prices.
            </p>
            <div className="mt-6">
              <Link to="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
            </div>
          </section>

          {/* Featured Products */}
          <section className="px-4 md:px-10">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product: Product) => {
                const imageUrls = product.images.split(", ");
                console.log("imageUrls - ", imageUrls[0]);

                return (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="group border rounded-xl overflow-hidden hover:shadow-md transition"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={imageUrls[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-medium line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {product.brand}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.isSale && (
                          <span className="line-through text-sm text-gray-400">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        <Star size={14} fill="currentColor" />
                        {product.rating}{" "}
                        <span className="text-gray-400">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;

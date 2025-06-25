import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import PageTransition from "@/components/Layout/PageTransition";
import ImageGallery from "@/components/ProductPage/ImageGallery";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import ReviewsSection from "@/components/ProductPage/ReviewsSection";
import LoadingSpinner from "@/components/ui/loading-spinner";

const reviews = [
  {
    id: "r1",
    author: {
      name: "Emily Thompson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    rating: 5,
    date: "2 months ago",
    title: "Absolutely Worth Every Penny",
    content:
      "I've been searching for the perfect cashmere sweater for years, and I've finally found it. The quality is exceptional - soft, not itchy at all, and feels like it will last for years. The fit is perfect too, not too tight or boxy. I ordered the ivory and the color is a beautiful creamy white that goes with everything.",
    helpful: 28,
    isVerified: true,
    tags: ["Perfect Fit", "High Quality", "Comfortable"],
  },
  {
    id: "r2",
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    rating: 4,
    date: "3 weeks ago",
    title: "Great Sweater, Slight Issue With Sizing",
    content:
      "The quality of this sweater is outstanding. The cashmere feels luxurious and substantial. My only issue is that it runs slightly small - I normally wear a medium but should have ordered a large. Customer service was very helpful with the exchange process though.",
    helpful: 15,
    isVerified: true,
    tags: ["Runs Small", "Great Service"],
  },
  {
    id: "r3",
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    rating: 5,
    date: "1 month ago",
    title: "Luxury at its Finest",
    content:
      "This sweater is a wardrobe essential. It's incredibly soft yet holds its shape well throughout the day. I've worn and washed it several times now and it still looks brand new. The forest green color is rich and exactly as pictured.",
    helpful: 12,
    isVerified: true,
  },
  {
    id: "r4",
    author: {
      name: "David Wilson",
    },
    rating: 3,
    date: "2 months ago",
    title: "Nice But Pilled Quickly",
    content:
      "The sweater is very soft and comfortable, but I was disappointed that it started pilling under the arms after just a few wears. For the price point, I expected it to be more durable. Still giving 3 stars because the customer service team responded promptly to my concerns.",
    helpful: 8,
    isVerified: false,
  },
  {
    id: "r5",
    author: {
      name: "Jessica Taylor",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    rating: 5,
    date: "3 months ago",
    title: "Perfect Gift",
    content:
      "I bought this as a birthday gift for my husband and he absolutely loves it. The quality is excellent and the navy color is sophisticated without being too dark. He says it's the softest sweater he's ever owned. Worth every penny!",
    helpful: 20,
    isVerified: true,
    tags: ["Gift", "High Quality"],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://vibrant-variant-venue-routes-handler-10100989956.development.catalystappsail.com/product/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const reviewSummary = {
    avgRating: product.rating,
    totalReviews: product.reviewCount,
    ratingDistribution: [98, 15, 7, 3, 1] as [
      number,
      number,
      number,
      number,
      number
    ],
  };

  const images = product.images.split(", ").map((img: string) => img.trim());
  return (
    <PageTransition>
      <div className="min-h-screen">
        <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
          {/* Product Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="w-full">
              <ImageGallery images={images} />
            </div>
            <div className="w-full">
              <ProductInfo product={{ ...product }} />
            </div>
          </section>

          <Separator className="my-16" />

          <section>
            <ReviewsSection
              productId={product.id}
              reviews={reviews}
              summary={reviewSummary}
            />
          </section>

          <Separator className="my-8" />
        </main>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;

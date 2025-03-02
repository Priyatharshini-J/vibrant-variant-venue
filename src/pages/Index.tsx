import { useEffect, useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import ImageGallery from '@/components/ProductPage/ImageGallery';
import ProductInfo from '@/components/ProductPage/ProductInfo';
import ReviewsSection from '@/components/ProductPage/ReviewsSection';
import RelatedProducts from '@/components/ProductPage/RelatedProducts';
import { Separator } from '@/components/ui/separator';
import PageTransition from '@/components/Layout/PageTransition';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const product = {
  id: '1',
  name: 'Premium Cashmere Sweater',
  brand: 'Nordic Essence',
  price: 189.99,
  originalPrice: 249.99,
  description: 'Crafted from the finest cashmere, this premium sweater offers exceptional softness and warmth. The minimalist design is complemented by meticulous attention to detail, resulting in a timeless piece that elevates any wardrobe.',
  details: [
    'Made from 100% grade-A Mongolian cashmere',
    'Responsibly sourced and produced',
    'Lightweight yet warm and breathable',
    'Ribbed collar, cuffs and hem',
    'Regular fit, true to size',
    'Machine washable on gentle wool cycle'
  ],
  rating: 4.8,
  reviewCount: 124,
  isNew: true,
  isSale: true
};

const variants = {
  colors: [
    { id: 'c1', label: 'Ivory White', value: 'ivory', hex: '#FFFFF0', available: true },
    { id: 'c2', label: 'Heather Gray', value: 'gray', hex: '#9FA8AB', available: true },
    { id: 'c3', label: 'Forest Green', value: 'green', hex: '#2C5530', available: true },
    { id: 'c4', label: 'Deep Navy', value: 'navy', hex: '#131E3A', available: true },
    { id: 'c5', label: 'Camel', value: 'camel', hex: '#B8A185', available: false },
  ],
  sizes: [
    { id: 's1', label: 'XS', value: 'xs', available: true },
    { id: 's2', label: 'S', value: 's', available: true },
    { id: 's3', label: 'M', value: 'm', available: true },
    { id: 's4', label: 'L', value: 'l', available: false },
    { id: 's5', label: 'XL', value: 'xl', available: true },
  ]
};

const images = [
  { 
    id: 'img1', 
    url: 'https://images.unsplash.com/photo-1581497396202-5645e76a3a8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 
    alt: 'Person wearing ivory cashmere sweater, front view' 
  },
  { 
    id: 'img2', 
    url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80', 
    alt: 'Person wearing ivory cashmere sweater, side view' 
  },
  { 
    id: 'img3', 
    url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80', 
    alt: 'Close up of sweater material texture' 
  },
  { 
    id: 'img4', 
    url: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80', 
    alt: 'Person wearing ivory cashmere sweater, back view' 
  }
];

const reviews = [
  {
    id: 'r1',
    author: {
      name: 'Emily Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    rating: 5,
    date: '2 months ago',
    title: 'Absolutely Worth Every Penny',
    content: "I've been searching for the perfect cashmere sweater for years, and I've finally found it. The quality is exceptional - soft, not itchy at all, and feels like it will last for years. The fit is perfect too, not too tight or boxy. I ordered the ivory and the color is a beautiful creamy white that goes with everything.",
    helpful: 28,
    isVerified: true,
    tags: ['Perfect Fit', 'High Quality', 'Comfortable']
  },
  {
    id: 'r2',
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    rating: 4,
    date: '3 weeks ago',
    title: 'Great Sweater, Slight Issue With Sizing',
    content: "The quality of this sweater is outstanding. The cashmere feels luxurious and substantial. My only issue is that it runs slightly small - I normally wear a medium but should have ordered a large. Customer service was very helpful with the exchange process though.",
    helpful: 15,
    isVerified: true,
    tags: ['Runs Small', 'Great Service']
  },
  {
    id: 'r3',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    rating: 5,
    date: '1 month ago',
    title: 'Luxury at its Finest',
    content: "This sweater is a wardrobe essential. It's incredibly soft yet holds its shape well throughout the day. I've worn and washed it several times now and it still looks brand new. The forest green color is rich and exactly as pictured.",
    helpful: 12,
    isVerified: true,
  },
  {
    id: 'r4',
    author: {
      name: 'David Wilson',
    },
    rating: 3,
    date: '2 months ago',
    title: 'Nice But Pilled Quickly',
    content: "The sweater is very soft and comfortable, but I was disappointed that it started pilling under the arms after just a few wears. For the price point, I expected it to be more durable. Still giving 3 stars because the customer service team responded promptly to my concerns.",
    helpful: 8,
    isVerified: false,
  },
  {
    id: 'r5',
    author: {
      name: 'Jessica Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    },
    rating: 5,
    date: '3 months ago',
    title: 'Perfect Gift',
    content: "I bought this as a birthday gift for my husband and he absolutely loves it. The quality is excellent and the navy color is sophisticated without being too dark. He says it's the softest sweater he's ever owned. Worth every penny!",
    helpful: 20,
    isVerified: true,
    tags: ['Gift', 'High Quality']
  }
];

const reviewSummary = {
  avgRating: 4.6,
  totalReviews: 124,
  ratingDistribution: [98, 15, 7, 3, 1] as [number, number, number, number, number]
};

const relatedProducts = [
  {
    id: 'p1',
    name: 'Merino Wool Cardigan',
    brand: 'Nordic Essence',
    price: 159.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2005&q=80', alt: 'Merino Wool Cardigan front view' },
      { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80', alt: 'Merino Wool Cardigan side view' }
    ],
    rating: 4.7,
    availableColors: [
      { hex: '#5E6064', name: 'Charcoal' },
      { hex: '#343F51', name: 'Navy' },
      { hex: '#BDB9A6', name: 'Oatmeal' }
    ]
  },
  {
    id: 'p2',
    name: 'Premium Alpaca Scarf',
    brand: 'Nordic Essence',
    price: 89.99,
    originalPrice: 120.00,
    images: [
      { url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', alt: 'Alpaca Scarf' },
      { url: 'https://images.unsplash.com/photo-1533756972958-d6f38a9761e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80', alt: 'Alpaca Scarf close up' }
    ],
    isSale: true,
    availableColors: [
      { hex: '#D4C7B4', name: 'Beige' },
      { hex: '#33302F', name: 'Black' },
      { hex: '#6A7086', name: 'Blue' },
      { hex: '#FF5733', name: 'Orange' }
    ]
  },
  {
    id: 'p3',
    name: 'Cashmere Beanie',
    brand: 'Nordic Essence',
    price: 69.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', alt: 'Cashmere Beanie' },
      { url: 'https://images.unsplash.com/photo-1510598155053-cdca7dea7f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', alt: 'Cashmere Beanie on model' }
    ],
    isNew: true,
    availableColors: [
      { hex: '#72736E', name: 'Gray' },
      { hex: '#7A5D4A', name: 'Brown' },
      { hex: '#101010', name: 'Black' }
    ]
  },
  {
    id: 'p4',
    name: 'Wool Blend Coat',
    brand: 'Atelier Moderne',
    price: 289.99,
    originalPrice: 349.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', alt: 'Wool Blend Coat' },
      { url: 'https://images.unsplash.com/photo-1548624313-0396c7a5f208?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80', alt: 'Wool Blend Coat on model' }
    ],
    isSale: true,
    availableColors: [
      { hex: '#2E3333', name: 'Charcoal' },
      { hex: '#8C6458', name: 'Camel' }
    ]
  },
  {
    id: 'p5',
    name: 'Cashmere Gloves',
    brand: 'Nordic Essence',
    price: 79.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1584829370052-1ad3b491c1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80', alt: 'Cashmere Gloves' },
    ],
    rating: 4.5,
    availableColors: [
      { hex: '#33302F', name: 'Black' },
      { hex: '#793D52', name: 'Burgundy' },
      { hex: '#2E3333', name: 'Charcoal' }
    ]
  },
  {
    id: 'p6',
    name: 'Cashmere Turtleneck',
    brand: 'Nordic Essence',
    price: 179.99,
    images: [
      { url: 'https://images.unsplash.com/photo-1608736213379-95732482538a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', alt: 'Cashmere Turtleneck' },
    ],
    isNew: true,
    isLimitedEdition: true,
    availableColors: [
      { hex: '#C3B0A7', name: 'Beige' },
      { hex: '#101010', name: 'Black' },
      { hex: '#FFFFFF', name: 'White' }
    ]
  }
];

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ScrollArea className="h-screen w-full">
      <PageTransition>
        <div className="min-h-screen">
          {/* Navbar */}
          <Navbar />
          
          {/* Main Content */}
          <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
            {/* Product Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* Product Images */}
              <div className="w-full">
                <ImageGallery images={images} />
              </div>
              
              {/* Product Info */}
              <div className="w-full">
                <ProductInfo product={product} variants={variants} />
              </div>
            </section>
            
            <Separator className="my-16" />
            
            {/* Reviews Section */}
            <section>
              <ReviewsSection 
                productId={product.id} 
                reviews={reviews}
                summary={reviewSummary}
              />
            </section>
            
            <Separator className="my-8" />
            
            {/* Related Products */}
            <section>
              <RelatedProducts products={relatedProducts} />
            </section>
            
            {/* Newsletter */}
            <section className="py-16 px-6">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="h3">Join Our Community</h2>
                <p className="text-muted-foreground">
                  Subscribe to our newsletter for exclusive offers, style updates, and first access to new collections.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <button className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/90">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </main>
          
          {/* Footer */}
          <footer className="bg-muted py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="space-y-4">
                <h3 className="font-display text-xl">Elegance</h3>
                <p className="text-muted-foreground text-sm">
                  Timeless pieces crafted with exceptional attention to detail and quality.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Shop</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Bestsellers</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Collections</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Accessories</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Sale</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Company</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Our Story</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Sustainability</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Customer Care</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">FAQs</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Size Guide</a></li>
                </ul>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground order-2 md:order-1">
                © {new Date().getFullYear()} Elegance. All rights reserved.
              </div>
              <div className="flex gap-6 order-1 md:order-2">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </ScrollArea>
  );
};

export default Index;

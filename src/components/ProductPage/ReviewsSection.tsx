
import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  isVerified: boolean;
  tags?: string[];
}

interface ReviewsSectionProps {
  productId: string;
  reviews: Review[];
  summary: {
    avgRating: number;
    totalReviews: number;
    ratingDistribution: [number, number, number, number, number]; // 5 to 1 stars count
  };
}

const ReviewsSection = ({ productId, reviews, summary }: ReviewsSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filteredReviews = activeFilter 
    ? reviews.filter(review => Math.round(review.rating) === activeFilter) 
    : reviews;
  
  const displayedReviews = showAllReviews 
    ? filteredReviews 
    : filteredReviews.slice(0, 3);

  const calculatePercentage = (count: number) => {
    return summary.totalReviews > 0 
      ? Math.round((count / summary.totalReviews) * 100) 
      : 0;
  };

  return (
    <div className="w-full py-10">
      <h2 className="h3 mb-8">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Summary */}
        <div className="space-y-6">
          <div className="text-center md:text-left space-y-2">
            <div className="flex justify-center md:justify-start items-center gap-2">
              <span className="text-4xl font-medium">{summary.avgRating.toFixed(1)}</span>
              <div className="flex flex-col items-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        "text-muted-foreground/70",
                        i < Math.floor(summary.avgRating) && "text-amber-400 fill-amber-400",
                        i === Math.floor(summary.avgRating) && summary.avgRating % 1 > 0 && "text-amber-400 fill-amber-400"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Based on {summary.totalReviews} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {summary.ratingDistribution.map((count, index) => {
              const stars = 5 - index;
              const percentage = calculatePercentage(count);
              
              return (
                <button 
                  key={`rating-${stars}`}
                  onClick={() => setActiveFilter(activeFilter === stars ? null : stars)}
                  className={cn(
                    "w-full flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-secondary",
                    activeFilter === stars && "bg-secondary"
                  )}
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{stars}</span>
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                  </div>
                  <div className="w-full h-2 bg-muted overflow-hidden rounded-full">
                    <div 
                      className="h-full bg-amber-400" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          
          {activeFilter && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                onClick={() => setActiveFilter(null)}
                className="w-full"
              >
                Clear filter
              </Button>
            </div>
          )}
        </div>

        {/* Reviews list */}
        <div className="md:col-span-2 space-y-8">
          {/* Filter mobile */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
            >
              <Filter size={16} />
              Filter reviews
            </Button>
          </div>
          
          {/* Reviews */}
          {displayedReviews.length > 0 ? (
            <div className="space-y-6">
              {displayedReviews.map((review) => (
                <div key={review.id} className="space-y-4 animate-appear">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <Avatar>
                        {review.author.avatar && (
                          <AvatarImage 
                            src={review.author.avatar} 
                            alt={review.author.name} 
                          />
                        )}
                        <AvatarFallback>
                          {review.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.author.name}</span>
                          {review.isVerified && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0 h-5 font-normal">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={cn(
                                  "text-muted-foreground/40",
                                  i < review.rating && "text-amber-400 fill-amber-400"
                                )}
                              />
                            ))}
                          </div>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-2">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp size={14} />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <MessageSquare size={14} />
                      <span>Reply</span>
                    </button>
                  </div>
                  
                  <Separator className="mt-6" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No reviews match your filter.</p>
            </div>
          )}
          
          {/* Show more button */}
          {filteredReviews.length > 3 && !showAllReviews && (
            <Button 
              variant="outline" 
              onClick={() => setShowAllReviews(true)}
              className="w-full"
            >
              Show all {filteredReviews.length} reviews
            </Button>
          )}
          
          {/* Write a review */}
          <div className="pt-6 mt-6 border-t">
            <Button className="w-full">Write a Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;

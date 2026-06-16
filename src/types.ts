export type BundleCategory = 
  | "all"
  | "ai-animation"
  | "motivation-growth"
  | "fitness-health"
  | "entertainment"
  | "movies-anime"
  | "sports"
  | "business-learning"
  | "premium-digital"
  | "premium-product";

export interface Bundle {
  id: string;
  title: string;
  description: string;
  category: BundleCategory;
  originalPrice: string;
  price: string;
  rating: string;
  reviews: string;
  itemsCount: string;
  badge: string;
  contents: string[];
  features: string[];
  externalLink?: string;
}

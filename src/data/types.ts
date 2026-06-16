export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface Tool {
  id: string;
  name: string;
  logo: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  url: string;
  tags: string[];
  pricing: "free" | "freemium" | "paid";
  isHot: boolean;
  isNew: boolean;
  order: number;
}

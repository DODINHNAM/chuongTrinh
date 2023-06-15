import { Product } from './Product.model';
export class Review {
  reviewID: number;
  product: Product;
  reviewName: string;
  userId: string;
  reviewStar: number;
  reviewMessage: string;
  date : Date;
  }
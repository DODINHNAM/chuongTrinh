import { Product } from "./Product.model";


export class Review {
  reviewID: number;
  product: Product;
  reviewName: string;
  userID: number;
  reviewStar: number;
  reviewMessage: string;
  date: Date;
  status: number;
}

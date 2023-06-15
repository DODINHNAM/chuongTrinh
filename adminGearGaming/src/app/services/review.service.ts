import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpBaseService) {}
  getReviews(params: any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/reviews`, params);
  }
  deleteReview(id): Observable<any> {
    return this.http.delete<any>(`/api/admin/v1/review/` + id);
  }
  saveReview(review): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/review`, review);
  }
}

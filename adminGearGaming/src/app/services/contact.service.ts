import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpBaseService) {}
  getContacts(params: any): Observable<any> {
    return this.http.get<any>(`/api/admin/v1/contacts`, params);
  }
  deleteContact(id): Observable<any> {
    return this.http.delete<any>(`/api/admin/v1/contact/` + id);
  }

  saveContact(contact): Observable<any> {
    return this.http.post<any>(`/api/admin/v1/contact`, contact);
  }
}

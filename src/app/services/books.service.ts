import { Injectable } from '@angular/core';
import { Book, BookResponse } from '../model/book.model';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BooksService {

  constructor(private httpService: HttpService) {}

  getBooks(queryField?: string): Observable<BookResponse> {
    if (!queryField) {
        return of({
          totalItems: 0, items:[]
        });
    }
    return this.httpService.getBooks(queryField);
}
}

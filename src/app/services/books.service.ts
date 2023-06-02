import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BooksService {

  constructor(private httpService: HttpService) {}

  getBooks(queryField?: string): Observable<Book[]> {
    if (!queryField) {
        return of([])
    }
    return this.httpService.getBooks(queryField).pipe(map(response => response.items));
}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookResponse } from '../model/book.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly API_KEY = 'AIzaSyCin4MViRUU9J6N3OnUGQRE-ztCvpuQJPs';
    constructor(private httpClient: HttpClient) {}

    getBooks(queryField: string | null): Observable<BookResponse> {
        return this.httpClient.get<BookResponse>(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${queryField}&maxResults=5&key=${this.API_KEY}`,
        );
    }

    getNextBooks(queryField: string | null, startIndex: number | null = null): Observable<BookResponse> {
        return this.httpClient.get<BookResponse>(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${queryField}&maxResults=5&startIndex=${startIndex}&key=${this.API_KEY}`,
        );
    }
}

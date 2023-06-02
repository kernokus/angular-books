import { Injectable, OnDestroy } from '@angular/core';
import { HttpService } from './http.service';
import { Book, BookResponse } from '../model/book.model';
import { BehaviorSubject, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { getFavorites, setFavoritesInStorage } from '../helpers/local-storage.helper';

@Injectable()
export class BooksPageService implements OnDestroy {
    private readonly _booksData$ = new BehaviorSubject<BookResponse | null>(null);
    readonly booksData$ = this._booksData$.asObservable();
    readonly books$ = this.booksData$.pipe(
        map((bookResponse) => {
            const books = bookResponse?.items;
            let favoritesBooks = getFavorites()?.map((book) => book.id);
            if (favoritesBooks && books) {
                return books.map((book) => {
                    book.isFavorites = favoritesBooks?.includes(book.id);
                    return book;
                });
            }
            return books;
        }),
    );
    readonly isCanMoreLoad$ = this.booksData$.pipe(
        map((data) => {
            const totalItems = data?.totalItems;
            if (totalItems) {
                return totalItems > this.currentIndex;
            }
            return false;
        }),
    );
    private readonly destroy$ = new Subject<void>();

    private currentIndex = 5;

    constructor(private httpService: HttpService) {
        this.loadBooks();
    }

    loadBooks(queryField?: string) {
        if (queryField) {
            this.httpService
                .getBooks(queryField)
                .pipe(
                    tap(() => (this.currentIndex = 5)),
                    takeUntil(this.destroy$),
                )
                .subscribe((data) => this._booksData$.next(data));
        }
    }

    loadNextBooks(queryField: string) {
        const _queryField = queryField === '' ? null : queryField;
        this.httpService
            .getNextBooks(_queryField, this.currentIndex)
            .pipe(
                tap(() => (this.currentIndex += 5)),
                takeUntil(this.destroy$),
            )
            .subscribe((response) => {
                const currentBooks = this._booksData$.value?.items;
                if (Array.isArray(currentBooks)) {
                    response.items = [...currentBooks, ...response.items];
                    this._booksData$.next(response);
                }
            });
    }

    updateFavorites(book: Book) {
        let currentFavorites = getFavorites();
        book.isFavorites = true;
        // console.log('currentFavorites', currentFavorites);
        const element = currentFavorites?.find((item) => item.id === book.id);
        if (element && currentFavorites) {
            currentFavorites = currentFavorites?.filter((book) => book.id !== element.id);
            setFavoritesInStorage(currentFavorites);
        } else if (!element && currentFavorites) {
            currentFavorites.push(book);
            setFavoritesInStorage(currentFavorites);
        } else {
            setFavoritesInStorage([book]);
        }
        this.refresh();
    }

    private refresh() {
        this._booksData$.next(this._booksData$.value);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

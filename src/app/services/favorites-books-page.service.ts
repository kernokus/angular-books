import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../model/book.model';
import { getFavorites, setFavoritesInStorage } from '../helpers/local-storage.helper';

@Injectable()
export class FavoritesBooksPageService {
    private readonly _favoritesBooks$ = new BehaviorSubject<Book[] | null>(null);
    readonly favoritesBooks$ = this._favoritesBooks$.asObservable();
    constructor() {
        this.loadFavorites();
    }

    private loadFavorites() {
        this._favoritesBooks$.next(getFavorites());
    }

    private refresh() {
        this._favoritesBooks$.next(getFavorites());
    }
    // refresh и loadFavorites имеют одинаковый функционал, но это частный случай.
    // Для упрощения понимания кода другими разработчиками выделяю разные операции в отдельные функции

    deleteFavoriteBook(book: Book) {
        const favorites = getFavorites()?.filter((favoriteBook) => favoriteBook.id !== book.id) || [];
        setFavoritesInStorage(favorites);
        this.refresh();
    }
}

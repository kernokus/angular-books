import { Book } from '../model/book.model';

export const FAVORITE_LOCAL_STORAGE_KEY = 'favorites';

export function setFavoritesInStorage(books: Book[]) {
    localStorage.setItem(FAVORITE_LOCAL_STORAGE_KEY, JSON.stringify(books));
}

export function getFavorites(): Book[] | null {
    return JSON.parse(<string>localStorage.getItem(FAVORITE_LOCAL_STORAGE_KEY));
}

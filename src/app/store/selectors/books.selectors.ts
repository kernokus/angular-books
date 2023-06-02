import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Book } from 'src/app/model/book.model';
 
export interface AppState {
    books: Book[];
}

export const selectBooks = (state: AppState) => state.books;

export const selectAllBooks = createSelector(
    selectBooks,
    (books: Book[]) => books
  );




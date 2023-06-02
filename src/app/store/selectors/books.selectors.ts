import { createSelector } from '@ngrx/store';
import { Book, BookResponse } from 'src/app/model/book.model';
 
export interface AppState {
    books: BookResponse
}

export const selectBooks = (state: AppState) => state.books;

export const selectAllBooks = createSelector(
    selectBooks,
    (bookResponse: BookResponse) => bookResponse.items
  );

export const isCanMoreLoad = createSelector(
    selectBooks,
    (bookResponse: BookResponse) => bookResponse.totalItems > bookResponse.items.length
)




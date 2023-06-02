import { createReducer, on } from '@ngrx/store';

import { BooksApiActions } from '../actions/books.actions';
import { Book } from '../../model/book.model';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.loadedBooks, (_state, {books}) => {
    console.log('books',books);
    return books
  })
);
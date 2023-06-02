import { createReducer, on } from '@ngrx/store';
import { BooksApiActions } from '../actions/books.actions';
import { BookResponse } from '../../model/book.model';

export const initialState: BookResponse = {
  items: [],
  totalItems: 0
}

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.loadedBooks, (_state, { bookResponse }) => {
    return bookResponse
  })
);
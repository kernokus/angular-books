import { createActionGroup,props } from '@ngrx/store';
import { BookResponse } from '../../model/book.model';


export const BooksActions = createActionGroup({
    source: 'Books',
    events: {
      'Add Book': props<{ bookId: string }>(),
      'Remove Book': props<{ bookId: string }>(),
    },
  });
   
  export const BooksApiActions = createActionGroup({
    source: 'Books API',
    events: {
      'loaded books': props<{ bookResponse: BookResponse }>(),
      'load books': props<{ queryField: string | null }>(),
      'load next books': props<{ queryField: string, startIndex: number }>
    },
  });
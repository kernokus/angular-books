import { createActionGroup,props } from '@ngrx/store';
import { Book } from '../../model/book.model';


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
      'loaded books': props<{books: ReadonlyArray<Book>}>(),
      'load books': props<{ queryField: string | null }>(),
    },
  });

  // 'loaded books': props<ReadonlyArray<Book>>(),
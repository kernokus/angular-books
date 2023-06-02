import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { BooksApiActions } from '../actions/books.actions';
 
@Injectable()
export class BooksEffects {
 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Books API] load books'),
    mergeMap((queryField) => this.booksService.getBooks(queryField)
    .pipe(map(books => {
        console.log('1',books)
        return BooksApiActions.loadedBooks({ books })
    })))
    )
  );
 
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
  ) {}
}
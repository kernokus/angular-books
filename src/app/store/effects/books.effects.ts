import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { BooksApiActions } from '../actions/books.actions';

@Injectable()
export class BooksEffects {
 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Books API] load books'),
    mergeMap((action: { type: string, queryField: string }) => this.booksService.getBooks(action.queryField)
    .pipe(map(bookResponse =>  BooksApiActions.loadedBooks({ bookResponse }))))
    )
  );
 
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
  ) {}
}
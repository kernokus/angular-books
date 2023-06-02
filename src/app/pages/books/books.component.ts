import { ChangeDetectionStrategy, Component, Inject, OnInit, Self } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/services/destroy.service';
import { BooksPageService } from '../../services/books-page.service';
import { Book } from '../../model/book.model';
import { Store } from '@ngrx/store';
import { BooksActions, BooksApiActions } from 'src/app/store/actions/books.actions';
import { selectAllBooks } from 'src/app/store/selectors/books.selectors';

@Component({
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BooksPageService, DestroyService],
})
export class BooksComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private bookPageService: BooksPageService,
        @Self() @Inject(DestroyService) private destroy$: Observable<void>,
        private store: Store<{ books: Book[] }>,
    ) {}

    readonly isCanMoreLoad$ = this.bookPageService.isCanMoreLoad$;
    private readonly loadNextBooks$ = new Subject<void>();

    readonly form = this.fb.group({ queryFieldControl: ['']});

    readonly books$ = this.store.select('books');

    ngOnInit() {
        
        this.form
            .get('queryFieldControl')
            ?.valueChanges.pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroy$),
            )
            .subscribe((queryField) => this.store.dispatch(BooksApiActions.loadBooks({ queryField })));

        this.loadNextBooks$
            .pipe(debounceTime(500), takeUntil(this.destroy$))
            .subscribe(() => this.bookPageService.loadNextBooks(this.form.get('queryFieldControl')?.value!));
    }
    onEditFavoriteStatus(book: Book) {
        this.bookPageService.updateFavorites(book);
    }
    loadNextBooks() {
        this.loadNextBooks$.next();
    }
}

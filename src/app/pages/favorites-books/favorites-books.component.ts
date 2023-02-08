import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FavoritesBooksPageService } from '../../services/favorites-books-page.service';
import { Book } from '../../model/book.model';

@Component({
    templateUrl: './favorites-books.component.html',
    styleUrls: ['./favorites-books.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FavoritesBooksPageService],
})
export class FavoritesBooksComponent {
    readonly favoritesBooks$ = this.favoritesBooksPageService.favoritesBooks$;

    readonly books: Book[] | null = JSON.parse(<string>localStorage.getItem('favorites'));
    constructor(private readonly favoritesBooksPageService: FavoritesBooksPageService) {}

    onDeleteFavoriteBook(book: Book) {
        this.favoritesBooksPageService.deleteFavoriteBook(book);
    }
}

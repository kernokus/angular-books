import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../model/book.model';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiIslandModule, TuiLinkModule, TuiSvgModule, NgIf],
})
export class BookComponent {
    @Input() book?: Book;
    @Output() readonly onEditFavoriteStatus = new EventEmitter<Book>();
    editFavoriteStatus(book: Book) {
        this.onEditFavoriteStatus.next(book);
    }
}

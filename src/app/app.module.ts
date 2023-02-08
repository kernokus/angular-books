import { TuiButtonModule, TuiGroupModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesBooksComponent } from './pages/favorites-books/favorites-books.component';
import { BooksComponent } from './pages/books/books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiRadioBlockModule } from '@taiga-ui/kit';
import { HttpClientModule } from '@angular/common/http';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: BooksComponent },
    { path: 'favorites', component: FavoritesBooksComponent },
];

@NgModule({
    declarations: [AppComponent, FavoritesBooksComponent, BooksComponent],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        TuiRootModule,
        TuiRadioBlockModule,
        TuiInputModule,
        TuiButtonModule,
        TuiGroupModule,
        BookComponent,
        EmptyListComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

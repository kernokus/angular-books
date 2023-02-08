import { ChangeDetectionStrategy, Component, Inject, OnInit, Self } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, takeUntil } from 'rxjs';
import { DestroyService } from './services/destroy.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class AppComponent implements OnInit {
    readonly title = 'books';
    readonly chipsConfig = [
        { label: 'Книги', item: 'books' },
        { label: 'Избранное', item: 'favorites' },
    ];
    private readonly paths = this.chipsConfig.map((item) => item.item);
    readonly navigationFormGroup = this.fb.group({
        choosenChip: ['books'],
    });

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        @Self() @Inject(DestroyService) private destroy$: Observable<void>,
    ) {}

    ngOnInit() {
        this.navigationFormGroup
            .get('choosenChip')
            ?.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
            .subscribe((path) => this.router.navigate([`./${path}`], { relativeTo: this.route }));

        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => event instanceof NavigationEnd),
                map((event) => event.url.split('/').pop()!),
                filter((path) => this.paths.includes(path)),
                takeUntil(this.destroy$),
            )
            .subscribe((url: string) => this.navigationFormGroup.get('choosenChip')?.setValue(url));
    }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';
@Component({
    selector: 'app-empty-list',
    templateUrl: './empty-list.component.html',
    styleUrls: ['./empty-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiSvgModule],
})
export class EmptyListComponent {}

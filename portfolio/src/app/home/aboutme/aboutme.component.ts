import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-aboutme',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './aboutme.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './aboutme.component.scss'
})
export class AboutmeComponent {}

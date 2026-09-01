import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';



@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink, TranslateModule, RouterLinkActive],
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}

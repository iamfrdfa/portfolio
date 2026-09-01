import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {RouterLink, RouterLinkActive} from '@angular/router';



@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink, TranslateModule, RouterLinkActive],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}

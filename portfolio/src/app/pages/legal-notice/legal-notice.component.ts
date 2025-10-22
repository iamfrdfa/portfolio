import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-notice',
    imports: [
        TranslateModule
    ],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
    constructor(private router: Router) {}

    goHomeToFooter() {
        this.router.navigate(['/']).then(() => {
            // kurze Verzögerung, bis die Startseite wirklich geladen ist
            setTimeout(() => {
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 300);
        });
    }
}

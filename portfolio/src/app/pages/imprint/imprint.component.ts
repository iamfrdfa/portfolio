import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-imprint',
  imports: [
      TranslateModule
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
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

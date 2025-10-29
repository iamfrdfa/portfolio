import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss'
})
export class SkillsComponent {

    scrollToContact(): void {
        const target = document.querySelector('#contactFormComponent') as HTMLElement | null;

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // optional: Fokus nach Scroll, für Accessibility / Form-Usability
            setTimeout(() => {
                // versuch ein Fokusfeld zu nehmen, z. B. dein Name-Input
                const firstInput = target.querySelector('input, textarea, button, [tabindex]') as HTMLElement | null;
                firstInput?.focus({ preventScroll: true });
            }, 600);
        }
    }
}

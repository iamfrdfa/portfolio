import { Component, Inject, inject, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageToggleComponent } from '../shared/ui/language-toggle/language-toggle.component';
import { LanguageService } from '../shared/services/language.service';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, RouterLink, RouterLinkActive, LanguageToggleComponent],
})
export class HeaderComponent {
    private langSvc = inject(LanguageService);

    // Beispiel – falls du im Template den Text brauchst
    isDE = computed(() => this.langSvc.lang() === 'de');
    isEN = computed(() => this.langSvc.lang() === 'en');

    constructor(@Inject(DOCUMENT) private document: Document) {}

    scrollTo(anchor: string) {
        const el = this.document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    switchTo(lang: 'de' | 'en') {
        this.langSvc.setLang(lang);
    }

    toggleLang() {
        this.langSvc.toggle();
    }
}

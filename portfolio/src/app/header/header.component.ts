import { Component, Inject, inject, computed } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageToggleComponent } from '../shared/ui/language-toggle/language-toggle.component';
import { LanguageService } from '../shared/services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, RouterLink, RouterLinkActive, LanguageToggleComponent, TranslateModule],
})
export class HeaderComponent {
    private langSvc = inject(LanguageService);
    private router = inject(Router);

    isDE = computed(() => this.langSvc.lang() === 'de');
    isEN = computed(() => this.langSvc.lang() === 'en');

    constructor(@Inject(DOCUMENT) private document: Document) {}

    // Optional: kannst du behalten – wird für Home-internes Scrollen ggf. nicht mehr gebraucht
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

    isMenuOpen = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(_event?: Event) {
        this.isMenuOpen = false;
    }

    /**
     * Zentraler Fix:
     * Von jeder Route (Impressum/Datenschutz/etc.) nach Home navigieren
     * und Fragment setzen. Home scrollt dann.
     */
    goHomeAndScroll(targetId: string) {
        this.isMenuOpen = false;

        this.router.navigate(['/'], { fragment: targetId });
    }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageToggleComponent } from '../shared/ui/language-toggle/language-toggle.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, RouterLink, RouterLinkActive, LanguageToggleComponent, TranslateModule],
})
export class HeaderComponent {
    isMenuOpen = false;

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(_event?: Event) {
        this.isMenuOpen = false;
    }
}

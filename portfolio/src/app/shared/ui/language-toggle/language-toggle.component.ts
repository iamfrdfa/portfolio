import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LangCode } from '../../../shared/services/language.service';

@Component({
    selector: 'app-language-toggle',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button
            class="lang-toggle"
            type="button"
            (click)="onToggle()"
            role="switch"
            [attr.aria-checked]="isEn()"
            [attr.aria-label]="ariaLabel()"
            [title]="titleText()"
        >
            <span class="pill">
            <!-- EN links, DE rechts -->
            <span class="label left">EN</span>
            <span class="label right">DE</span>

              <!-- Thumb ist rechts NUR wenn DE aktiv ist -->
            <span class="thumb" [class.right]="!isEn()"></span>
            </span>
        </button>

    `,
    styleUrls: ['./language-toggle.component.scss']
})
export class LanguageToggleComponent {
    /** Optional: Startsprache von außen setzen (wird reaktiv beachtet) */
    lang = input<LangCode | undefined>(undefined);

    isEn = computed(() => this.language.lang() === 'en');

    constructor(private language: LanguageService) {
        // Reagiert auf spätere Input-Änderungen (Angular 20: signals-safe)
        // Setzt nur, wenn eine gültige Sprache ankommt.
        // Kein Endlosloop, da set() auf denselben Wert keine Änderung triggert.
        queueMicrotask(() => {
            const initial = this.lang();
            if (initial === 'de' || initial === 'en') this.language.set(initial);
        });
    }

    onToggle(): void {
        this.language.toggle();
    }

    ariaLabel(): string {
        return this.isEn() ? 'Switch language to German' : 'Switch language to English';
    }

    titleText(): string {
        return this.isEn() ? 'EN • Click to switch to DE' : 'DE • Click to switch to EN';
    }
}

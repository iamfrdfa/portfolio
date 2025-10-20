import { Injectable, effect, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type LangCode = 'de' | 'en';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    /** Reaktiver Sprach-State als Signal */
    private _lang = signal<LangCode>(initLang());

    /** Readonly-Signal für Komponenten */
    lang = this._lang.asReadonly();

    constructor(private translate: TranslateService) {
        // Auf Signal-Änderungen reagieren (einziger „Writer“ ist setLang/toggle)
        effect(() => {
            const l = this._lang();
            this.translate.use(l);
            localStorage.setItem(STORAGE_KEY, l);
            document.documentElement.setAttribute('lang', l);
        });

        // Sicherstellen, dass Translate eine Startsprache hat (Englisch)
        if (!this.translate.currentLang) {
            this.translate.use(this._lang()); // 'en' durch initLang()
        }
    }

    /** Aktuellen Wert als normales Getter (optional) */
    get current(): LangCode {
        return this._lang();
    }

    setLang(lang: LangCode) {
        if (lang !== this._lang()) {
            this._lang.set(lang);
        }
    }

    toggle() {
        this._lang.set(this._lang() === 'de' ? 'en' : 'de');
    }
}

/** Startsprache ermitteln – Default: 'en' */
function initLang(): LangCode {
    const saved = (localStorage.getItem(STORAGE_KEY) || '').toLowerCase();
    if (saved === 'de' || saved === 'en') return saved as LangCode;

    const n = (navigator.language || '').toLowerCase();
    return n.startsWith('de') ? 'de' : 'en'; // Browser-Fallback
}

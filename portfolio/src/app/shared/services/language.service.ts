import { Injectable, Signal, signal, effect, inject } from '@angular/core';

export type LangCode = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly STORAGE_KEY = 'app.lang';
    private readonly _lang = signal<LangCode>(this.readInitial());

    lang: Signal<LangCode> = this._lang.asReadonly();

    constructor() {
        // <html lang="..."> aktualisieren + persistieren (nur im Browser)
        effect(() => {
            const l = this._lang();
            if (this.isBrowser()) {
                document.documentElement.lang = l;
                try { localStorage.setItem(this.STORAGE_KEY, l); } catch {}
            }
        });
    }

    toggle(): void {
        this.set(this._lang() === 'de' ? 'en' : 'de');
    }

    set(lang: LangCode): void {
        this._lang.set(lang);
    }

    /** Initialwert: gespeichertes Lang oder Browser-Heuristik */
    private readInitial(): LangCode {
        if (this.isBrowser()) {
            try {
                const saved = localStorage.getItem(this.STORAGE_KEY) as LangCode | null;
                if (saved === 'de' || saved === 'en') return saved;
            } catch {}
            const browser = (navigator.language || 'en').toLowerCase();
            return browser.startsWith('de') ? 'de' : 'en';
        }
        return 'en';
    }

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    }
}

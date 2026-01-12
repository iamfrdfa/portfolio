import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollService {
    private firstLoad = true;

    // Route-Pfad -> DOM id
    private readonly routeToId: Record<string, string> = {
        '/aboutme': 'aboutMeComponent',
        '/skills': 'skillComponent',
        '/projects': 'projects',
        '/valuation': 'valuationComponent',
        '/contact': 'contactFormComponent',
        // WICHTIG: '/' NICHT mappen, sonst "Start-Scroll" auf Header-Höhe
    };

    constructor(
        private router: Router,
        private zone: NgZone,
        @Inject(DOCUMENT) private document: Document
    ) {}

    init(): void {
        this.router.events
            .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe((e) => {
                const url = e.urlAfterRedirects.split('?')[0].split('#')[0];

                // Fix: Beim allerersten Load auf '/' nicht scrollen
                if (this.firstLoad && url === '/') {
                    this.firstLoad = false;
                    // sicherheitshalber wirklich nach ganz oben (ohne Animation)
                    this.zone.runOutsideAngular(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
                    return;
                }
                this.firstLoad = false;

                const id = this.routeToId[url];
                if (!id) return;

                this.zone.runOutsideAngular(() => {
                    this.scrollToIdWithRetry(id, 30, 40);
                });
            });
    }

    private scrollToIdWithRetry(id: string, tries = 20, delayMs = 50) {
        let attempt = 0;

        const tick = () => {
            const el = this.document.getElementById(id);

            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }

            attempt++;
            if (attempt >= tries) return;

            setTimeout(tick, delayMs);
        };

        tick();
    }
}

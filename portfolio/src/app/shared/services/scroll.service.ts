import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';

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

                // Beim ersten Load auf '/' nicht automatisch scrollen
                if (this.firstLoad && url === '/') {
                    this.firstLoad = false;
                    this.zone.runOutsideAngular(() =>
                        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                    );
                    return;
                }
                this.firstLoad = false;

                const id = this.routeToId[url];
                if (!id) return;

                // Wichtig: Scrollen erst, wenn Angular + Layout stabil sind
                this.scrollToIdAfterStabilization(id);
            });
    }

    private scrollToIdAfterStabilization(id: string): void {
        // 1) Angular-Rendering abwarten (Microtasks/Change Detection fertig)
        this.zone.onStable.pipe(first()).subscribe(() => {
            // 2) Zusätzlich Layout-Stabilität abwarten (Fonts/Images/Reflow auf Mobile)
            this.zone.runOutsideAngular(() => {
                const el = this.document.getElementById(id);
                if (!el) return;

                this.scrollWhenPositionStable(el, () => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        });
    }

    /**
     * Wartet, bis die absolute Y-Position des Elements über mehrere Frames stabil bleibt.
     * Das ist die saubere Antwort auf Mobile-Reflow/CLS nach Route-Wechseln.
     */
    private scrollWhenPositionStable(
        el: HTMLElement,
        doScroll: () => void,
        framesToConfirm = 6,
        maxFrames = 90
    ): void {
        let lastY: number | null = null;
        let stableFrames = 0;
        let frames = 0;

        const getAbsY = () => el.getBoundingClientRect().top + window.scrollY;

        const tick = () => {
            frames++;
            const y = getAbsY();

            if (lastY !== null && Math.abs(y - lastY) < 0.5) {
                stableFrames++;
            } else {
                stableFrames = 0;
            }

            lastY = y;

            // Sobald stabil -> scroll ausführen
            if (stableFrames >= framesToConfirm) {
                doScroll();
                return;
            }

            // Sicherheitsbremse (falls irgendwas dauerhaft animiert)
            if (frames >= maxFrames) {
                doScroll();
                return;
            }

            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }
}

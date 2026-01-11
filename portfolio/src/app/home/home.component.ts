import { CommonModule } from '@angular/common';
import { Component, OnDestroy, AfterViewInit, NgZone, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ValuationComponent } from './valuation/valuation.component';
import { ContactformComponent } from '../contactform/contactform.component';
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        AboutmeComponent,
        SkillsComponent,
        ProjectsComponent,
        ValuationComponent,
        ContactformComponent,
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    readonly MARQUEE_REPEAT_PER_HALF = 4;

    marqueeItems: string[] = [];
    marqueeHalf: string[] = [];
    marqueeRepeat = Array.from({ length: 4 });

    private langSub?: Subscription;

    private route = inject(ActivatedRoute);
    private zone = inject(NgZone);

    constructor(private translate: TranslateService) {
        this.buildMarqueeFromI18n();
        this.langSub = this.translate.onLangChange.subscribe((_e: LangChangeEvent) => {
            this.buildMarqueeFromI18n();
        });
    }

    ngAfterViewInit(): void {
        // Auf Fragment-Änderungen reagieren (z.B. von Impressum -> Home#projects)
        this.route.fragment.subscribe((id) => {
            if (!id) return;

            // außerhalb Angular, damit ChangeDetection nicht unnötig triggert
            this.zone.runOutsideAngular(() => {
                this.scrollToIdWithRetry(id, 25, 40); // ~1 Sekunde max
            });
        });
    }

    private scrollToIdWithRetry(id: string, tries = 20, delayMs = 50) {
        let attempt = 0;

        const tick = () => {
            const el = document.getElementById(id);

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

    private buildMarqueeFromI18n() {
        const arr = this.translate.instant('home.marquee') as unknown;
        const list = Array.isArray(arr) ? (arr as string[]) : [
            'Available for remote work',
            'Frontend Developer',
            'Open to work',
            'Based in Maintal'
        ];
        this.marqueeItems = list;
        this.marqueeHalf = Array.from({ length: this.MARQUEE_REPEAT_PER_HALF })
            .flatMap(() => this.marqueeItems);
    }

    // --- CTA: Scroll zu Projects
    scrollToProjects() {
        const el = document.querySelector('#projects');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // --- CTA: Scroll zu Kontakt & erstes Feld fokussieren
    async scrollToContactAndFocus() {
        const container = document.querySelector('#contactFormComponent') as HTMLElement | null;
        if (!container) return;

        container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Warte kurz bis der Scroll abgeschlossen ist (scrollend, rAF + Timeout Fallback)
        await this.waitForScrollEnd(350);

        const firstFocusable = container.querySelector<HTMLElement>(
            'input:not([type="hidden"]), textarea, select, [contenteditable="true"], button, [tabindex]:not([tabindex="-1"])'
        );

        if (firstFocusable) {
            firstFocusable.focus({ preventScroll: true } as any);

            if (firstFocusable instanceof HTMLInputElement || firstFocusable instanceof HTMLTextAreaElement) {
                const len = firstFocusable.value?.length ?? 0;
                try {
                    firstFocusable.setSelectionRange?.(len, len);
                } catch {}
            }
        }
    }

    private waitForScrollEnd(timeoutMs = 300): Promise<void> {
        return new Promise((resolve) => {
            let done = false;
            const finish = () => {
                if (done) return;
                done = true;
                resolve();
            };

            const onScrollEnd = () => {
                window.removeEventListener('scrollend', onScrollEnd as any);
                finish();
            };

            try {
                window.addEventListener('scrollend', onScrollEnd as any, { once: true });
            } catch {}

            let raf = 0;
            const start = performance.now();
            const tick = (t: number) => {
                if (t - start >= timeoutMs) {
                    cancelAnimationFrame(raf);
                    finish();
                    return;
                }
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        });
    }

    testimonials = [
        { quote: 'testimonials.items.0.quote', author: 'testimonials.items.0.author', role: 'testimonials.items.0.role' },
        { quote: 'testimonials.items.1.quote', author: 'testimonials.items.1.author', role: 'testimonials.items.1.role' },
        { quote: 'testimonials.items.2.quote', author: 'testimonials.items.2.author', role: 'testimonials.items.2.role' },
        { quote: 'testimonials.items.3.quote', author: 'testimonials.items.3.author', role: 'testimonials.items.3.role' },
        { quote: 'testimonials.items.4.quote', author: 'testimonials.items.4.author', role: 'testimonials.items.4.role' }
    ];

    ngOnDestroy(): void {
        this.langSub?.unsubscribe();
    }
}

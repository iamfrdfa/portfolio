import { Component, HostListener, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';

@Component({
    selector: 'app-scroll-top',
    standalone: true,
    templateUrl: './scroll-top.component.html',
    styleUrl: './scroll-top.component.scss',
})
export class ScrollTopComponent implements AfterViewInit, OnDestroy {
    private elRef = inject(ElementRef<HTMLElement>);

    isVisible = false;
    overFooter = false;

    private io?: IntersectionObserver;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.isVisible = window.scrollY > 400;
    }

    ngAfterViewInit(): void {
        // Footer finden: app-footer (dein Component) oder fallback footer-Tag
        const footerEl =
            document.querySelector('app-footer') ??
            document.querySelector('footer');

        if (!footerEl) return;

        this.io = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const isInView = !!entry?.isIntersecting;

                this.overFooter = isInView;

                if (!isInView) {
                    this.elRef.nativeElement.style.setProperty('--footer-offset', `0px`);
                    return;
                }

                const footerHeight = footerEl.getBoundingClientRect().height;
                const offset = Math.min(Math.max(footerHeight, 80), 240); // clamp (80..240)
                this.elRef.nativeElement.style.setProperty('--footer-offset', `${offset}px`);
            },
            { root: null, threshold: 0 }
        );

        this.io.observe(footerEl);
    }

    ngOnDestroy(): void {
        this.io?.disconnect();
    }

    scrollToTop() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
}

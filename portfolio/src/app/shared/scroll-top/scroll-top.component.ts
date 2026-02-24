import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-scroll-top',
    standalone: true,
    templateUrl: './scroll-top.component.html',
    styleUrl: './scroll-top.component.scss',
})
export class ScrollTopComponent {
    isVisible = false;

    @HostListener('window:scroll')
    onWindowScroll() {
        this.isVisible = window.scrollY > 400;
    }

    scrollToTop() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
    }
}

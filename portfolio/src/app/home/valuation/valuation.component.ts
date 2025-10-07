import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type Testimonial = { quote: string; author: string; role?: string };

@Component({
    selector: 'app-valuation',
    standalone: true,
    templateUrl: './valuation.component.html',
    styleUrls: ['./valuation.component.scss'],
    imports: [CommonModule],
})
export class ValuationComponent implements AfterViewInit {
    @Input() items: Testimonial[] = [];

    @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;
    @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLDivElement>;

    slides: Testimonial[] = [];
    idx = 1;
    transitioning = false;

    private cardWidth = 632;
    private cardGap = 72;
    private centerOffset = 0;

    ngAfterViewInit() {
        if (!this.items?.length) return;

        // 1️⃣ Klone für Loop erstellen
        this.slides = [this.items[this.items.length - 1], ...this.items, this.items[0]];
        this.idx = 2; // starte bei erstem echten Slide

        // 2️⃣ Erste Positionierung ohne Animation
        this.disableTransition();
        this.measure();
        requestAnimationFrame(() => this.applyTranslate());
    }

    get realLength() {
        return this.items.length;
    }

    // === Navigation ===
    prev() {
        if (this.transitioning) return;
        this.goto(this.idx - 1);
    }

    next() {
        if (this.transitioning) return;
        this.goto(this.idx + 1);
    }

    goDot(i: number) {
        if (this.transitioning) return;
        this.goto(i + 1); // da idx=1 beim ersten echten Slide startet
    }

    private goto(target: number) {
        this.transitioning = true;
        this.idx = target;
        this.enableTransition();
        this.applyTranslate();
    }

    // === Nach der Transition prüfen, ob an Rand gesprungen ===
    onTransitionEnd() {
        this.disableTransition();
        this.transitioning = false;

        if (this.idx === 0) {
            this.idx = this.realLength; // von lastClone → letzter echter
            this.applyTranslate();
        } else if (this.idx === this.realLength + 1) {
            this.idx = 1; // von firstClone → erster echter
            this.applyTranslate();
        }
    }

    // === Größenänderung ===
    @HostListener('window:resize')
    onResize() {
        this.disableTransition();
        this.measure();
        this.applyTranslate();
    }

    // === Swipe / Drag ===
    private startX = 0;
    private deltaX = 0;
    private dragging = false;

    onPointerDown(e: PointerEvent) {
        this.dragging = true;
        this.startX = e.clientX;
        this.deltaX = 0;
        this.track.nativeElement.setPointerCapture(e.pointerId);
        this.disableTransition();
    }

    onPointerMove(e: PointerEvent) {
        if (!this.dragging) return;
        this.deltaX = e.clientX - this.startX;
        this.applyTranslate(this.deltaX);
    }

    onPointerUp(e: PointerEvent) {
        if (!this.dragging) return;
        this.dragging = false;

        const threshold = Math.min(80, this.cardWidth * 0.15);
        if (this.deltaX > threshold) this.prev();
        else if (this.deltaX < -threshold) this.next();
        else {
            this.enableTransition();
            this.applyTranslate();
        }

        this.track.nativeElement.releasePointerCapture(e.pointerId);
    }

    // === Geometrie messen ===
    private measure() {
        const vw = this.viewport.nativeElement.clientWidth;
        const firstCard = this.track.nativeElement.querySelector('.card') as HTMLElement | null;
        if (firstCard) {
            const cs = getComputedStyle(firstCard);
            this.cardWidth = firstCard.offsetWidth;
            this.cardGap = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
        }

        // mittig zentrieren, inkl. Feintuning
        this.centerOffset = (vw - this.cardWidth) / 2 - (this.cardGap / 2) - 30;
    }

    private applyTranslate(dragOffset = 0) {
        const step = this.cardWidth + this.cardGap;
        const x = -(this.idx * step) + this.centerOffset + dragOffset;
        this.track.nativeElement.style.transform = `translate3d(${x}px, 0, 0)`;
    }

    private enableTransition() {
        this.track.nativeElement.style.transition = 'transform .45s ease';
    }

    private disableTransition() {
        this.track.nativeElement.style.transition = 'none';
    }

    get activeDot() {
        if (this.idx === 0) return this.realLength - 1;
        if (this.idx === this.realLength + 1) return 0;
        return this.idx - 1;
    }
}

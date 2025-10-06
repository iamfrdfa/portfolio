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

    /** Maße für Positionierung */
    private cardWidth = 632;   // Zielbreite einer Karte in px
    private cardGap = 48;      // Summe aus margin-left + margin-right einer Karte
    private centerOffset = 0;  // Offset, um die aktive Karte im Viewport zu zentrieren

    ngAfterViewInit() {
        if (!this.items?.length) return;
        // Clones für Endlos-Loop
        this.slides = [this.items[this.items.length - 1], ...this.items, this.items[0]];
        this.measure();
        requestAnimationFrame(() => this.applyTranslate());
    }

    get realLength() { return this.items.length; }

    // Pfeile
    prev() { if (!this.transitioning) this.goto(this.idx - 1); }
    next() { if (!this.transitioning) this.goto(this.idx + 1); }

    // Dots
    goDot(i: number) { if (!this.transitioning) this.goto(i + 1); }

    private goto(target: number) {
        this.transitioning = true;
        this.idx = target;
        this.enableTransition();
        this.applyTranslate();
    }

    // Nach Transition ggf. „snappen“ (Loop)
    onTransitionEnd() {
        this.disableTransition();
        this.transitioning = false;

        if (this.idx === 0) {
            this.idx = this.realLength; // von lastClone → letzter echter
            this.applyTranslate();
        } else if (this.idx === this.realLength + 1) {
            this.idx = 1;               // von firstClone → erster echter
            this.applyTranslate();
        }
    }

    // Resize: Maße neu berechnen und Position anwenden
    @HostListener('window:resize')
    onResize() {
        this.disableTransition();
        this.measure();
        this.applyTranslate();
    }

    // Swipe / Drag
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

        // Schwellwert relativ zur Kartenbreite
        const threshold = Math.min(80, this.cardWidth * 0.15);

        if (this.deltaX > threshold) this.prev();
        else if (this.deltaX < -threshold) this.next();
        else { this.enableTransition(); this.applyTranslate(); } // zurücksnappen

        this.track.nativeElement.releasePointerCapture(e.pointerId);
    }

    /** Maße & Offsets messen (holt reale Werte aus CSS, falls geändert) */
    private measure() {
        const vw = this.viewport.nativeElement.clientWidth; // Breite des sichtbaren Bereichs

        const firstCard = this.track.nativeElement.querySelector('.card') as HTMLElement | null;
        if (firstCard) {
            const cs = getComputedStyle(firstCard);
            this.cardWidth = firstCard.offsetWidth;
            this.cardGap = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
        }

        // aktive Karte im Viewport zentrieren
        this.centerOffset = (vw - this.cardWidth) / 2 - (this.cardGap / 2) - 35;
    }

    /** Translate berechnen: -(idx * (Breite+Gap)) + CenterOffset (+ Drag-Offset) */
    private applyTranslate(dragOffset = 0) {
        const step = this.cardWidth + this.cardGap;
        const x = -(this.idx * step) + this.centerOffset + dragOffset;
        this.track.nativeElement.style.transform = `translate3d(${x}px,0,0)`;
    }

    private enableTransition() { this.track.nativeElement.style.transition = 'transform .45s ease'; }
    private disableTransition() { this.track.nativeElement.style.transition = 'none'; }

    // aktiver echter Index für Dots
    get activeDot() {
        if (this.idx === 0) return this.realLength - 1;
        if (this.idx === this.realLength + 1) return 0;
        return this.idx - 1;
    }
}

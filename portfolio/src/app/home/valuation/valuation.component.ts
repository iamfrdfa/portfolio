import {
    Component,
    Input,
    ElementRef,
    ViewChild,
    AfterViewInit,
    HostListener,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type Testimonial = { quote: string; author: string; role?: string };

@Component({
    selector: 'app-valuation',
    standalone: true,
    templateUrl: './valuation.component.html',
    styleUrls: ['./valuation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TranslateModule],
})
export class ValuationComponent implements OnChanges, AfterViewInit {
    @Input() items: Testimonial[] = [];
    @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;
    @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLDivElement>;

    slides: Testimonial[] = [];
    idx = 1; // 1 = erstes echtes Slide (0 ist linker Clone)
    transitioning = false;

    private cardWidth = 632;
    private cardGap = 72;
    private centerOffset = 0;
    private viewReady = false;

    // ==== Lifecycle ====

    // WICHTIG: Slides und Index hier setzen (vor dem 1. Check) → verhindert NG0100
    ngOnChanges(changes: SimpleChanges): void {
        if ('items' in changes) {
            const src = this.items ?? [];
            if (src.length > 0) {
                // [lastClone, ...real, firstClone]
                this.slides = [src[src.length - 1], ...src, src[0]];
                this.idx = 1; // auf das 1. echte Element zeigen
            } else {
                this.slides = [];
                this.idx = 1;
            }

            // Wenn die View bereits fertig ist, nur neu positionieren (ohne Wertänderung in Template)
            if (this.viewReady) {
                this.disableTransition();
                this.measure();
                requestAnimationFrame(() => this.applyTranslate());
            }
        }
    }

    ngAfterViewInit(): void {
        this.viewReady = true;

        // Initiale Messung + Positionierung (ändert keine Template-gebundenen Werte)
        this.disableTransition();
        this.measure();
        requestAnimationFrame(() => this.applyTranslate());
    }

    // ==== Getter ====

    get realLength(): number {
        return this.items.length;
    }

    get activeDot(): number {
        if (this.idx === 0) return this.realLength - 1;          // linker Clone
        if (this.idx === this.realLength + 1) return 0;           // rechter Clone
        return this.idx - 1;                                      // echtes Index
    }

    // ==== Navigation ====

    prev(): void {
        if (!this.transitioning) this.goto(this.idx - 1);
    }

    next(): void {
        if (!this.transitioning) this.goto(this.idx + 1);
    }

    goDot(i: number): void {
        if (!this.transitioning) this.goto(i + 1); // +1 wegen linken Clones
    }

    private goto(target: number): void {
        this.transitioning = true;
        this.idx = target;
        this.enableTransition();
        this.applyTranslate();
    }

    onTransitionEnd(): void {
        this.disableTransition();
        this.transitioning = false;

        // Endlos-Loop-Korrektur (ändert nur idx, nicht die Slides-Struktur)
        if (this.idx === 0) {
            this.idx = this.realLength; // springe ans Ende (letztes echtes)
            this.applyTranslate();
        } else if (this.idx === this.realLength + 1) {
            this.idx = 1; // springe an den Anfang (erstes echtes)
            this.applyTranslate();
        }
    }

    // ==== Resize ====

    @HostListener('window:resize')
    onResize(): void {
        this.disableTransition();
        this.measure();
        this.applyTranslate();
    }

    // ==== Dragging / Pointer ====

    private startX = 0;
    private deltaX = 0;
    private dragging = false;

    onPointerDown(e: PointerEvent): void {
        this.dragging = true;
        this.startX = e.clientX;
        this.deltaX = 0;
        this.track.nativeElement.setPointerCapture(e.pointerId);
        this.disableTransition();
    }

    onPointerMove(e: PointerEvent): void {
        if (!this.dragging) return;
        this.deltaX = e.clientX - this.startX;
        this.applyTranslate(this.deltaX);
    }

    onPointerUp(e: PointerEvent): void {
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

    // ==== Layout / Transform ====

    private measure(): void {
        const vw = this.viewport.nativeElement.clientWidth;
        const firstCard = this.track.nativeElement.querySelector('.card') as HTMLElement | null;

        if (firstCard) {
            const cs = getComputedStyle(firstCard);
            this.cardWidth = firstCard.offsetWidth;
            this.cardGap = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
        }

        // Zentrier-Offset (kleine Korrektur von -30 bleibt bestehen)
        this.centerOffset = (vw - this.cardWidth) / 2 - this.cardGap / 2 - 30;

        // ❌ nicht mehr nötig (Schleier sitzt nun direkt an .viewport):
        // const rect = this.viewport.nativeElement.getBoundingClientRect();
        // this.viewport.nativeElement.style.setProperty('--vp-left', `${rect.left}px`);

        // ✅ reicht aus – Breite der Fade-Zonen je Seite (für ::before/::after)
        const leftGutter = Math.max(0, (vw - this.cardWidth) / 2);
        this.viewport.nativeElement.style.setProperty('--left-cover', `${leftGutter}px`);
    }

    private applyTranslate(dragOffset = 0): void {
        const step = this.cardWidth + this.cardGap;
        const x = -(this.idx * step) + this.centerOffset + dragOffset;
        this.track.nativeElement.style.transform = `translate3d(${x}px, 0, 0)`;
    }

    private enableTransition(): void {
        this.track.nativeElement.style.transition = 'transform .45s ease';
    }

    private disableTransition(): void {
        this.track.nativeElement.style.transition = 'none';
    }
}

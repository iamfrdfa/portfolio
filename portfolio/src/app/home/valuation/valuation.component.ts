import { Component, Input, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Typdefinition für ein Testimonial-Objekt.
 * @property quote - Der eigentliche Zitattext.
 * @property author - Name der Person, die das Testimonial abgegeben hat.
 * @property role - (optional) Die Rolle oder Funktion des Autors.
 */
type Testimonial = { quote: string; author: string; role?: string };

/**
 * Die `ValuationComponent` implementiert einen interaktiven, loopfähigen Testimonial-Slider.
 *
 * Funktionen:
 * - Endlos-Slides durch Duplizieren erster/letzter Elemente
 * - Navigation über Pfeile, Dots oder Swipe-Gesten
 * - Dynamische Größenmessung & Responsive Anpassung
 * - Visuelle Übergänge über CSS-Transformationen
 */
@Component({
    selector: 'app-valuation',
    standalone: true,
    templateUrl: './valuation.component.html',
    styleUrls: ['./valuation.component.scss'],
    imports: [CommonModule],
})
export class ValuationComponent implements AfterViewInit {

    /** Liste der anzuzeigenden Testimonials. */
    @Input() items: Testimonial[] = [];

    /** Referenz auf den Track-Container, der alle Slides enthält. */
    @ViewChild('track', { static: true }) track!: ElementRef<HTMLDivElement>;

    /** Referenz auf den sichtbaren Viewport-Bereich des Sliders. */
    @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLDivElement>;

    /** Interne Liste inklusive erster/letzter Klone zur Realisierung des Loops. */
    slides: Testimonial[] = [];

    /** Aktuell aktiver Slide-Index (inklusive Klone). */
    idx = 1;

    /** Flag, ob sich der Slider aktuell in einer Transition befindet. */
    transitioning = false;

    /** Breite einer einzelnen Karte (px). */
    private cardWidth = 632;

    /** Horizontaler Abstand (linke + rechte Margin) zwischen Karten (px). */
    private cardGap = 72;

    /** Korrigierter Offset, um die aktive Karte mittig im Viewport zu zentrieren. */
    private centerOffset = 0;

    /**
     * Lifecycle-Hook: Wird aufgerufen, nachdem View-Elemente initialisiert wurden.
     * Initialisiert Slides, berechnet Abstände und setzt die Startposition.
     */
    ngAfterViewInit(): void {
        if (!this.items?.length) return;

        // 1️⃣ Klone für Loop erstellen (letztes + erstes Element)
        this.slides = [this.items[this.items.length - 1], ...this.items, this.items[0]];
        this.idx = 2; // Start bei zweitem echten Slide (zweiter Punkt aktiv)

        // 2️⃣ Erste Positionierung ohne Animation
        this.disableTransition();
        this.measure();
        requestAnimationFrame(() => this.applyTranslate());
    }

    /** @returns Anzahl echter (nicht geklonter) Slides. */
    get realLength(): number {
        return this.items.length;
    }

    // ============================================================
    // === Navigations-Methoden (Buttons / Dots) ==================
    // ============================================================

    /** Wechselt zum vorherigen Slide. */
    prev(): void {
        if (this.transitioning) return;
        this.goto(this.idx - 1);
    }

    /** Wechselt zum nächsten Slide. */
    next(): void {
        if (this.transitioning) return;
        this.goto(this.idx + 1);
    }

    /**
     * Wechselt zu einem bestimmten Slide über die Pagination-Dots.
     * @param i - Index (0-basiert) des Ziel-Slides.
     */
    goDot(i: number): void {
        if (this.transitioning) return;
        this.goto(i + 1); // da idx=1 beim ersten echten Slide startet
    }

    /**
     * Interne Methode zur Navigation auf einen Ziel-Index.
     * @param target - Neuer Indexwert (inkl. Klone)
     */
    private goto(target: number): void {
        this.transitioning = true;
        this.idx = target;
        this.enableTransition();
        this.applyTranslate();
    }

    // ============================================================
    // === Transition / Loop-Handling =============================
    // ============================================================

    /**
     * Wird nach Abschluss einer CSS-Transition ausgelöst.
     * Prüft, ob sich der Slider am Anfang/Ende befindet,
     * und springt bei Bedarf nahtlos auf den echten Slide zurück.
     */
    onTransitionEnd(): void {
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

    // ============================================================
    // === Resize-Handling ========================================
    // ============================================================

    /**
     * Wird bei Fenstergrößenänderungen aufgerufen.
     * Aktualisiert interne Maße und positioniert Slider neu.
     */
    @HostListener('window:resize')
    onResize(): void {
        this.disableTransition();
        this.measure();
        this.applyTranslate();
    }

    // ============================================================
    // === Pointer / Swipe-Interaktion =============================
    // ============================================================

    /** Startposition beim Beginn eines Pointer-Events. */
    private startX = 0;

    /** Aktuelle horizontale Verschiebung seit Start (px). */
    private deltaX = 0;

    /** Ob der Benutzer aktuell einen Swipe ausführt. */
    private dragging = false;

    /**
     * Wird beim Drücken eines Pointers (Touch/Maus) ausgelöst.
     * @param e - Pointer-Event-Objekt
     */
    onPointerDown(e: PointerEvent): void {
        this.dragging = true;
        this.startX = e.clientX;
        this.deltaX = 0;
        this.track.nativeElement.setPointerCapture(e.pointerId);
        this.disableTransition();
    }

    /**
     * Wird bei Pointer-Bewegungen ausgelöst (während Drag aktiv).
     * @param e - Pointer-Event-Objekt
     */
    onPointerMove(e: PointerEvent): void {
        if (!this.dragging) return;
        this.deltaX = e.clientX - this.startX;
        this.applyTranslate(this.deltaX);
    }

    /**
     * Wird ausgelöst, wenn der Benutzer den Pointer loslässt.
     * Bestimmt anhand eines Schwellwerts, ob zum nächsten/ vorherigen Slide gewechselt wird.
     * @param e - Pointer-Event-Objekt
     */
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

    // ============================================================
    // === Geometrie / Layout-Berechnung ==========================
    // ============================================================

    /**
     * Liest aktuelle Layout-Werte (Kartenbreite, Margin, Viewport-Position)
     * aus dem DOM aus und speichert sie zur späteren Positionsberechnung.
     */
    private measure(): void {
        const vw = this.viewport.nativeElement.clientWidth;
        const firstCard = this.track.nativeElement.querySelector('.card') as HTMLElement | null;
        if (firstCard) {
            const cs = getComputedStyle(firstCard);
            this.cardWidth = firstCard.offsetWidth;
            this.cardGap = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
        }

        // Zentriert aktive Karte horizontal (inkl. manueller Korrektur)
        this.centerOffset = (vw - this.cardWidth) / 2 - (this.cardGap / 2) - 30;

        // Dynamische CSS-Variablen für Schleier-Berechnung setzen
        const rect = this.viewport.nativeElement.getBoundingClientRect();
        this.viewport.nativeElement.style.setProperty('--vp-left', `${rect.left}px`);

        const leftGutter = Math.max(0, (vw - this.cardWidth) / 2);
        this.viewport.nativeElement.style.setProperty('--left-cover', `${leftGutter}px`);
    }

    /**
     * Wendet die aktuelle Transformationsposition auf den Track an.
     * @param dragOffset - Optionaler Zusatz-Offset während Drag-Bewegung (px)
     */
    private applyTranslate(dragOffset = 0): void {
        const step = this.cardWidth + this.cardGap;
        const x = -(this.idx * step) + this.centerOffset + dragOffset;
        this.track.nativeElement.style.transform = `translate3d(${x}px, 0, 0)`;
    }

    /** Aktiviert CSS-Transitionen für Slide-Bewegungen. */
    private enableTransition(): void {
        this.track.nativeElement.style.transition = 'transform .45s ease';
    }

    /** Deaktiviert CSS-Transitionen (z. B. bei Resize oder Snapping). */
    private disableTransition(): void {
        this.track.nativeElement.style.transition = 'none';
    }

    /**
     * Liefert den aktiven Dot-Index (0-basiert, ohne Klone).
     * @returns Index des aktuell sichtbaren echten Slides
     */
    get activeDot(): number {
        if (this.idx === 0) return this.realLength - 1;
        if (this.idx === this.realLength + 1) return 0;
        return this.idx - 1;
    }
}

import { Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-mouse-spotlight',
    standalone: true,
    templateUrl: './mouse-spotlight.component.html',
    styleUrl: './mouse-spotlight.component.scss',
})
export class MouseSpotlightComponent implements OnInit, OnDestroy {
    private rafId: number | null = null;
    private lastX = 0;
    private lastY = 0;

    private removeListener: (() => void) | null = null;

    constructor(
        private zone: NgZone,
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        // Start-Position (optional)
        this.setVars(window.innerWidth / 2, window.innerHeight / 2);

        this.zone.runOutsideAngular(() => {
            this.removeListener = this.renderer.listen('window', 'pointermove', (e: PointerEvent) => {
                this.lastX = e.clientX;
                this.lastY = e.clientY;

                if (this.rafId !== null) return;

                this.rafId = requestAnimationFrame(() => {
                    this.setVars(this.lastX, this.lastY);
                    this.rafId = null;
                });
            });
        });
    }

    ngOnDestroy(): void {
        if (this.removeListener) this.removeListener();
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    }

    private setVars(x: number, y: number) {
        const el = this.host.nativeElement;
        // direkt am Host setzen -> keine Change Detection nötig
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
    }
}

import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    Renderer2,
    inject,
} from '@angular/core';

type Anim =
    | 'fade-up'
    | 'fade'
    | 'slide-left'
    | 'slide-right'
    | 'scale-in'
    | 'stagger-children';

@Directive({
    selector: '[animateOnScroll]',
    standalone: true,
})
export class AnimateOnScrollDirective implements AfterViewInit, OnDestroy {
    private el = inject(ElementRef<HTMLElement>);
    private r = inject(Renderer2);

    private io?: IntersectionObserver;
    private hasAnimated = false;

    @Input('animateOnScroll') animation: Anim = 'fade-up';
    @Input() once = true;
    @Input() threshold: number | number[] = 0.2;
    @Input() rootMargin = '0px 0px -10% 0px';
    @Input() delay = 0;
    @Input() duration = 650;

    ngAfterViewInit(): void {
        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

        this.r.addClass(this.el.nativeElement, 'aos');
        this.r.addClass(this.el.nativeElement, `aos--${this.animation}`);
        this.r.setStyle(this.el.nativeElement, '--aos-delay', `${this.delay}ms`);
        this.r.setStyle(this.el.nativeElement, '--aos-duration', `${this.duration}ms`);

        if (reduce) {
            this.r.addClass(this.el.nativeElement, 'aos--in');
            return;
        }

        this.io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        this.enter();
                        if (this.once) this.io?.unobserve(entry.target);
                    }
                }
            },
            { threshold: this.threshold, rootMargin: this.rootMargin }
        );

        this.io.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        this.io?.disconnect();
    }

    private enter() {
        if (this.once && this.hasAnimated) return;
        this.hasAnimated = true;
        this.r.addClass(this.el.nativeElement, 'aos--in');
    }
}

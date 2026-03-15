import { Component, HostListener } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayService } from '../services/overlay.service';

@Component({
    selector: 'app-overlay-host',
    standalone: true,
    imports: [CommonModule, TranslateModule, DecimalPipe],
    templateUrl: './overlay-host.component.html',
    styleUrl: './overlay-host.component.scss',
})
export class OverlayHostComponent {
    constructor(public overlay: OverlayService) {}

    private iconMap: Record<string, string> = {
        JavaScript: '/img/icons/javascript-small.svg',
        HTML: '/img/icons/html-small.svg',
        CSS: '/img/icons/css-small.svg',
        'Material Design': '/img/icons/material-small.svg',
        Angular: '/img/icons/angular-small.svg',
        TypeScript: '/img/icons/typescript-small.svg',
        Firebase: '/img/icons/firebase-small.svg',
    };

    @HostListener('document:keydown.escape')
    onEsc(): void {
        if (this.overlay.isOpen) {
            this.overlay.close();
        }
    }

    getIcon(label: string): string {
        return this.iconMap[label] ?? this.iconMap['HTML'];
    }
}

import { Component, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    scrollTo(anchor: string) {
        const el = this.document.getElementById(anchor);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

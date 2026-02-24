import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollService } from './shared/services/scroll.service';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top.component';
import { MouseSpotlightComponent } from './shared/ui/mouse-spotlight/mouse-spotlight.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollTopComponent, MouseSpotlightComponent],
    template: `
        <app-mouse-spotlight></app-mouse-spotlight>

        <app-header></app-header>

        <main>
            <router-outlet></router-outlet>
        </main>

        <app-footer></app-footer>

        <app-scroll-top></app-scroll-top>
    `,
})
export class AppComponent {
    private scrollSvc = inject(ScrollService);

    constructor() {
        this.scrollSvc.init();
    }
}

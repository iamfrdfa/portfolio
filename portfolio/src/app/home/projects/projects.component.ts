import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

type Tech =
    | 'JavaScript'
    | 'HTML'
    | 'CSS'
    | 'Material Design'
    | 'Angular'
    | 'TypeScript'
    | 'Firebase';

type ProjectKey = 'join' | 'epl' | 'dabubble';

type Project = {
    key: ProjectKey;
    name: string;             // Eigennamen bleiben i.d.R. unübersetzt
    tech: Tech[];
    image: string;
    descriptionKey: string;   // i18n-Key in JSON
    repoUrl?: string;
    liveUrl?: string;
};

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
    /** Zuordnung Tech → Icon (klein). Pfade bei Bedarf anpassen. */
    private iconMap: Record<Tech, string> = {
        JavaScript: '/img/icons/javascript-small.svg',
        HTML: '/img/icons/html-small.svg',
        CSS: '/img/icons/css-small.svg',
        'Material Design': '/img/icons/material-small.svg',
        Angular: '/img/icons/angular-small.svg',
        TypeScript: '/img/icons/typescript-small.svg',
        Firebase: '/img/icons/firebase-small.svg',
    };

    /** Projekte mit i18n-Description-Key */
    projects: Project[] = [
        {
            key: 'join',
            name: 'Join',
            tech: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
            image: '/img/thumbnails/join-overlay.svg',
            descriptionKey: 'projects.items.join.desc',
            repoUrl: '',
            liveUrl: '',
        },
        {
            key: 'epl',
            name: 'El Pollo Loco',
            tech: ['JavaScript', 'HTML', 'CSS'],
            image: '/img/thumbnails/epl-overlay.svg',
            descriptionKey: 'projects.items.epl.desc',
            repoUrl: '',
            liveUrl: '',
        },
        {
            key: 'dabubble',
            name: 'DA Bubble',
            tech: ['Angular', 'Firebase', 'TypeScript'],
            image: '/img/thumbnails/dabubble-overlay.svg',
            descriptionKey: 'projects.items.dabubble.desc',
            repoUrl: '',
            liveUrl: '',
        },
    ];

    // ---------- Overlay-State ----------
    isOpen = false;
    current = 0;

    openOverlay(index: number) {
        this.current = index;
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }
    closeOverlay() {
        this.isOpen = false;
        document.body.style.overflow = '';
    }
    @HostListener('document:keydown.escape') onEsc() {
        if (this.isOpen) this.closeOverlay();
    }

    prev() { if (this.hasPrev) this.current--; }
    next() { if (this.hasNext) this.current++; }
    get hasPrev() { return this.current > 0; }
    get hasNext() { return this.current < this.projects.length - 1; }

    /** Icon-Pfad für ein Tech-Label. Fallback: HTML-Icon */
    getIcon(label: Tech): string {
        return this.iconMap[label] ?? this.iconMap['HTML'];
    }

    /** Optional: "A | B | C" String, falls nötig */
    asPipeString(list: Tech[]): string {
        return list.join(' | ');
    }
}

import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tech =
    | 'JavaScript'
    | 'HTML'
    | 'CSS'
    | 'Material Design'
    | 'Angular'
    | 'TypeScript'
    | 'Firebase';

type Project = {
    name: string;
    tech: Tech[];          // ← dynamisch pro Projekt
    image: string;
    description: string;
    repoUrl?: string;
    liveUrl?: string;
};

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
    /** Zuordnung Tech → Icon (klein). Passe Pfade bei Bedarf an. */
    private iconMap: Record<Tech, string> = {
        JavaScript: '/img/icons/javascript-small.svg',
        HTML: '/img/icons/html-small.svg',
        CSS: '/img/icons/css-small.svg',
        'Material Design': '/img/icons/material-small.svg',
        Angular: '/img/icons/angular-small.svg',
        TypeScript: '/img/icons/typescript-small.svg',
        Firebase: '/img/icons/firebase-small.svg',
    };

    /** Projekte mit individuellem Tech-Stack. */
    projects: Project[] = [
        {
            name: 'Join',
            tech: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
            image: '/img/thumbnails/join-overlay.svg',
            description:
                'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
            repoUrl: '',
            liveUrl: '',
        },
        {
            name: 'El Pollo Loco',
            tech: ['JavaScript', 'HTML', 'CSS'],
            image: '/img/thumbnails/epl-overlay.svg',
            description:
                'Jump-and-run browser game. Focus on sprites, collision handling and simple game state management.',
            repoUrl: '',
            liveUrl: '',
        },
        {
            name: 'DA Bubble',
            tech: ['Angular', 'Firebase', 'TypeScript'],
            image: '/img/thumbnails/dabubble-overlay.svg',
            description:
                'Team messenger inspired by Slack. Real-time channels, threads, mentions, and file uploads.',
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

    /** Techs als „A | B | C“ für die Liste (falls du es in den Zeilen nutzen willst) */
    asPipeString(list: Tech[]): string {
        return list.join(' | ');
    }
}

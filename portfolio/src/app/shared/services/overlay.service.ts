import { Injectable } from '@angular/core';

export interface OverlayProject {
    key?: string;
    name: string;
    tech: string[];
    image: string;
    descriptionKey: string;
    repoUrl?: string;
    liveUrl?: string;
}

@Injectable({
    providedIn: 'root',
})
export class OverlayService {

    isOpen = false;
    isClosing = false;

    projects: OverlayProject[] = [];
    current = 0;

    open(projects: OverlayProject[], index: number): void {

        this.projects = projects;
        this.current = index;

        this.isClosing = false;
        this.isOpen = true;

        document.body.style.overflow = 'hidden';
    }

    close(): void {

        if (this.isClosing) return;

        this.isClosing = true;

        setTimeout(() => {

            this.isOpen = false;
            this.isClosing = false;

            this.projects = [];
            this.current = 0;

            document.body.style.overflow = '';

        }, 260); // muss zur CSS Animation passen
    }

    prev(): void {
        if (this.hasPrev) this.current--;
    }

    next(): void {
        if (this.hasNext) this.current++;
    }

    get project(): OverlayProject | null {
        return this.projects[this.current] ?? null;
    }

    get hasPrev(): boolean {
        return this.current > 0;
    }

    get hasNext(): boolean {
        return this.current < this.projects.length - 1;
    }

}

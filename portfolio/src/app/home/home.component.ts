import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutmeComponent} from './aboutme/aboutme.component';
import {SkillsComponent} from './skills/skills.component';
import {ProjectsComponent} from './projects/projects.component';
import {ValuationComponent} from './valuation/valuation.component';
import {ContactComponent} from './contact/contact.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,         // für *ngFor im Marquee
        AboutmeComponent,
        SkillsComponent,
        ProjectsComponent,
        ValuationComponent,
        ContactComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    // Optional: Smooth Scroll, wenn du später Buttons auf Scroll umstellst
    scrollToProjects() {
        document.querySelector('#featuredSkills')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    scrollToContact() {
        document.querySelector('#valuationComponent')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    // Anzahl Wiederholungen deiner 4 Punkte innerhalb EINER Hälfte.
    // Bei Bedarf auf 5–6 erhöhen, falls deine Wörter sehr kurz sind.
    readonly MARQUEE_REPEAT_PER_HALF = 4;

    marqueeItems: string[] = [
        'Available for remote work',
        'Frontend Developer',
        'Open to work',
        'Based in Maintal'
    ];

    // Ab hier NICHT ändern: wir bauen Hälfte A und B identisch auf.
    marqueeHalf: string[] = Array.from({length: this.MARQUEE_REPEAT_PER_HALF})
        .flatMap(() => this.marqueeItems);

    marqueeRepeat = Array.from({length: 4}); // Anzahl Wiederholungen pro Track

    testimonials = [
        {
            quote: 'Lukas has proven to be a reliable group partner, delivering excellent results and clear communication throughout the project.',
            author: 'H. Janisch',
            role: 'Team Partner'
        },
        {
            quote: 'I had the good fortune of working with Lukas on several frontend projects. His structured approach and sense for design stand out.',
            author: 'A. Smith',
            role: 'Frontend Dev'
        },
        {
            quote: 'Always calm, cool and knowledgeable — even when deadlines are tight. A pleasure to collaborate with.',
            author: 'T. Schulz',
            role: 'Frontend Developer'
        },
        {
            quote: 'Working with Lukas means having clean code, clear communication, and a dependable partner in every sprint.',
            author: 'M. Becker',
            role: 'Project Manager'
        },
        {
            quote: 'Lukas not only understands frontend development but also brings strong UX intuition and team spirit to the table.',
            author: 'S. Nguyen',
            role: 'UX Designer'
        },
    ];
}

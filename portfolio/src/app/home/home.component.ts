import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ValuationComponent } from './valuation/valuation.component';
import { ContactformComponent } from '../contactform/contactform.component';
import { RouterLink } from '@angular/router';

// NEW: ngx-translate
import { TranslateModule, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        AboutmeComponent,
        SkillsComponent,
        ProjectsComponent,
        ValuationComponent,
        ContactformComponent,
        RouterLink,

        // NEW: for | translate in template
        TranslateModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
    readonly MARQUEE_REPEAT_PER_HALF = 4;

    marqueeItems: string[] = [];
    marqueeHalf: string[] = [];
    marqueeRepeat = Array.from({ length: 4 });

    private langSub?: Subscription;

    constructor(private translate: TranslateService) {
        this.buildMarqueeFromI18n();
        this.langSub = this.translate.onLangChange.subscribe((_e: LangChangeEvent) => {
            this.buildMarqueeFromI18n();
        });
    }

    private buildMarqueeFromI18n() {
        // Read array from i18n; fallback to English if something goes wrong
        const arr = this.translate.instant('home.marquee') as unknown;
        const list = Array.isArray(arr) ? arr as string[] : [
            'Available for remote work',
            'Frontend Developer',
            'Open to work',
            'Based in Maintal'
        ];

        this.marqueeItems = list;
        this.marqueeHalf = Array.from({ length: this.MARQUEE_REPEAT_PER_HALF })
            .flatMap(() => this.marqueeItems);
    }

    scrollToProjects() {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    scrollToContact() {
        document.querySelector('#valuationComponent')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

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
        }
    ];

    ngOnDestroy(): void {
        this.langSub?.unsubscribe();
    }
}

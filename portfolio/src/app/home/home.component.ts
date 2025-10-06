import {Component} from '@angular/core';
import {AboutmeComponent} from './aboutme/aboutme.component';
import {SkillsComponent} from './skills/skills.component';
import {ProjectsComponent} from './projects/projects.component';
import {ValuationComponent} from './valuation/valuation.component';

@Component({
    selector: 'app-home',
    imports: [
        AboutmeComponent,
        SkillsComponent,
        ProjectsComponent,
        ValuationComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    scrollToProjects() {

    }

    scrollToContact() {

    }

    testimonials = [
        { quote: 'Lukas has proven to be a reliable group partner...', author: 'H. Janisch', role: 'Team Partner' },
        { quote: 'I had the good fortune of working with Lukas...', author: 'A. Smith', role: 'Frontend Dev' },
        { quote: 'Always calm, cool and knowledgeable...', author: 'T. Schulz', role: 'Frontend Developer' },
    ];

}

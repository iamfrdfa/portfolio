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
        { quote: 'Lukas has proven to be a reliable group partner, delivering excellent results and clear communication throughout the project.', author: 'H. Janisch', role: 'Team Partner' },
        { quote: 'I had the good fortune of working with Lukas on several frontend projects. His structured approach and sense for design stand out.', author: 'A. Smith', role: 'Frontend Dev' },
        { quote: 'Always calm, cool and knowledgeable — even when deadlines are tight. A pleasure to collaborate with.', author: 'T. Schulz', role: 'Frontend Developer' },
        { quote: 'Working with Lukas means having clean code, clear communication, and a dependable partner in every sprint.', author: 'M. Becker', role: 'Project Manager' },
        { quote: 'Lukas not only understands frontend development but also brings strong UX intuition and team spirit to the table.', author: 'S. Nguyen', role: 'UX Designer' },
    ];

}

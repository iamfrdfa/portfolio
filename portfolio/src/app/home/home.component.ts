import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterOutlet} from '@angular/router';
import {AboutmeComponent} from './aboutme/aboutme.component';
import {SkillsComponent} from './skills/skills.component';
import {ProjectsComponent} from './projects/projects.component';

@Component({
  selector: 'app-home',
    imports: [
        TranslatePipe,
        RouterOutlet,
        AboutmeComponent,
        SkillsComponent,
        ProjectsComponent,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    scrollToProjects() {

    }

    scrollToContact() {

    }
}

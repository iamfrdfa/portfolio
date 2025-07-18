import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterOutlet} from '@angular/router';
import {AboutmeComponent} from './aboutme/aboutme.component';
import {SkillsComponent} from './skills/skills.component';

@Component({
  selector: 'app-home',
    imports: [
        TranslatePipe,
        RouterOutlet,
        AboutmeComponent,
        SkillsComponent,
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

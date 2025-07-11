import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './sections/about/about.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import {ContactformComponent} from './contactform/contactform.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'about', component: AboutComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'projects', component: ProjectsComponent }
        ]
    },
    {
        path: 'contact',
        component: ContactformComponent
    }
];

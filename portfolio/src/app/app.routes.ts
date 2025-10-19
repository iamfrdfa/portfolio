import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutmeComponent } from './home/aboutme/aboutme.component';
import { SkillsComponent } from './home/skills/skills.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { ValuationComponent } from './home/valuation/valuation.component';
import { ContactformComponent } from './contactform/contactform.component';

// ▼ Passe ggf. den Pfad an, falls du die Komponente woanders erzeugt hast
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'about', component: AboutmeComponent },
            { path: 'skills', component: SkillsComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'valuation', component: ValuationComponent },
        ],
    },
    { path: 'contact', component: ContactformComponent },
    { path: 'legal-notice', component: LegalNoticeComponent }, // ← http://localhost:4200/legal-notice
    { path: '**', redirectTo: '' }, // Fallback
];

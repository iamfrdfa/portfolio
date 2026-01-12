import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ContactformComponent } from './contactform/contactform.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { ImprintComponent } from './pages/imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    // "Pretty" One-Pager URLs
    { path: 'aboutme', component: HomeComponent },
    { path: 'skills', component: HomeComponent },
    { path: 'projects', component: HomeComponent },
    { path: 'valuation', component: HomeComponent },
    { path: 'contact', component: HomeComponent }, // wenn Kontakt als Section auf Home bleiben soll

    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'imprint', component: ImprintComponent },

    { path: '**', redirectTo: '' },
];

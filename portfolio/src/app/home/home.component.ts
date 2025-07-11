import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterOutlet} from '@angular/router';
import {BannerComponent} from '../shared/components/banner/banner.component';
import {CustomButtonComponent} from '../shared/components/custom-button/custom-button.component';

@Component({
  selector: 'app-home',
    imports: [
        TranslatePipe,
        RouterOutlet,
        BannerComponent,
        CustomButtonComponent
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

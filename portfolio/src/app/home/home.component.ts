import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
    imports: [
        TranslatePipe,
        RouterOutlet,
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

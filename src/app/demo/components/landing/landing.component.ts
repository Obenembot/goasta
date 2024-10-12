import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html'
})
export class LandingComponent {
    serviceName :string = 'moson infra'
    constructor(public layoutService: LayoutService, public router: Router) {
    }

    logout(): void {
        this.router.navigate(['/auth/login']);
    }

    register(): void {
        this.router.navigate(['/auth/register'])
    }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private auth: AuthenticationService,
    private router: Router ){

  }
  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');


  }
}

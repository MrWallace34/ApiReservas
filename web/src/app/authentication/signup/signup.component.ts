import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(@Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.document.body.classList.remove('bg-gradient-primary');
  }

  ngOnInit(): void {
    this.document.body.classList.add('bg-gradient-primary');
  }

  onSignup(form: any): void {
    console.log(form.value);
    this.authenticationService.register(form.value).subscribe(
      (res) => {
        this.router.navigateByUrl('/login');
      }
    );
  }
}

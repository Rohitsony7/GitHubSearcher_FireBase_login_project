import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private ToastrService: ToastrService,
    private AuthService: AuthService,
    private Router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { email, password } = f.form.value;

    // checking and validating email, password handled by firebase

    this.AuthService.signIn(email, password)
      .then((res) => {
        this.Router.navigateByUrl('/');
      })
      .then((res) => {
        this.ToastrService.success('signIn Success !');
      })
      .catch((err) => {
        console.error(err.message);
        this.ToastrService.error('SignIn failed');
      });
  }
}

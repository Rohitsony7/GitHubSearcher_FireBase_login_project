import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private ToastrService: ToastrService,
    private AuthService: AuthService,
    private Router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { email, password } = f.form.value;

    // checking and validating email, password handled by firebase

    this.AuthService.signUp(email, password)
      .then((res) => {
        this.Router.navigateByUrl('/');
      })
      .then((res) => {
        this.ToastrService.success('signUp Success !');
      })
      .catch((err) => {
        console.error(err.message);
        this.ToastrService.error(err.message);
      });
  }
}

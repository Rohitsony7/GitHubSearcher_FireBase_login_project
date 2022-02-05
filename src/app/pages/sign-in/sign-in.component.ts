import { HttpErrorResponse } from '@angular/common/http';
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
  errorMsg: string | undefined;
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
      .catch((error) => {
        console.error(error.message);
        // this.ToastrService.error(err.message);
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          this.errorMsg = `Error: ${error.error.message}`;
        } else {
          this.errorMsg = this.getServerErrorMessage(error);
        }

        this.errorMsg = this.getServerErrorMessage(error);

        this.ToastrService.error(this.errorMsg);
      });
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}

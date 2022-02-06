import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  errorMsg!: string;
  constructor(
    private ToastrService: ToastrService,
    private AuthService: AuthService,
    private Router: Router,
    private LoadingService: LoadingService
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.LoadingService.show();
    const { email, password } = f.form.value;

    // checking and validating email, password handled by firebase

    this.AuthService.signUp(email, password)
      .then((res) => {
        this.Router.navigateByUrl('/');
      })
      .then((res) => {
        this.ToastrService.success('signUp Success !');
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
        this.ToastrService.error(this.errorMsg);
      })
      .finally(() => {
        this.LoadingService.hide();
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

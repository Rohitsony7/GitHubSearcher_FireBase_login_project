import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email: any = null;
  constructor(
    private AuthService: AuthService,
    private ToastrService: ToastrService,
    private Router: Router
  ) {
    // latest rxJs with subscribe
    //handled Observable
    AuthService.getUser().subscribe({
      next: (user) => {
        this.email = user?.email;
      },
      error: (err) => {
        console.log('>>> Error >>>', err);
        this.ToastrService.error(err);
      },
      complete: () => console.log('Get user done...'),
    });
  }

  ngOnInit(): void {}

  //handled promise
  handleSignOut() {
    this.AuthService.signOut()
      .then((res) => {
        console.log('sign out success', res);
      })
      .then(() => {
        this.Router.navigateByUrl('/signin');
      })
      .then(() => {
        this.ToastrService.info('Login again to continue.');
      })
      .then(() => {
        this.email = null;
      })
      .catch((err) => {
        console.error('error >>>>', err);
        this.ToastrService.error('Something went wrong !!');
      })
      .finally(() => {
        console.log('sign out mehtod done...');
      });
  }
}

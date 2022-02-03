import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  userName: any;
  Error = null;

  constructor(
    private GithubService: GithubService,
    private ref: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  handleFind() {
    this.GithubService.getUserDetails(this.userName).subscribe({
      next: (user) => {
        this.user = user;
        //since this is an observable and the user details will be updating again and again so will use ref
        this.ref.detectChanges();
      },
      error: (err) => {
        console.log('>>> Error >>>', err);
        this.ref.detectChanges();
        this.ToastrService.error(err);
      },
      complete: () => console.log('Get user done...'),
    });
  }
}

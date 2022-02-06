import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit, OnChanges {
  @Input() repoUrl!: string;

  repos: any = [];

  constructor(
    private GithubService: GithubService,
    private ref: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.repoUrl) {
      this.GithubService.getUserRepo(this.repoUrl).subscribe({
        next: (res) => {
          this.repos = res;
          this.ref.detectChanges();
          console.table(this.repos);
        },
        error: (err) => {
          console.log('>>> Error >>>', err);
          this.ToastrService.error(err);
        },
        complete: () => console.log('Get user done...'),
      });
    }
  }
}

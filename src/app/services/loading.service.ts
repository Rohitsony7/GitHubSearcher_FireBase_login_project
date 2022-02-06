import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading: any = new BehaviorSubject<boolean>(false).pipe(delay(1));
  public readonly loading$ = this._loading.asObservable();

  constructor() {}

  show = () => this._loading.next(true);
  hide = () => this._loading.next(false);
}

import { TestBed } from '@angular/core/testing';

import { NetworlInterceptor } from './networl.interceptor';

describe('NetworlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NetworlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NetworlInterceptor = TestBed.inject(NetworlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoginsroleGuard } from './loginsrole.guard';

describe('LoginsroleGuard', () => {
  let guard: LoginsroleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginsroleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

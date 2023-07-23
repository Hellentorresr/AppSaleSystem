import { TestBed } from '@angular/core/testing';

import { UsertwoService } from './usertwo.service';

describe('UsertwoService', () => {
  let service: UsertwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsertwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

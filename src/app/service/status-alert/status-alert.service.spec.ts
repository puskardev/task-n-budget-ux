import { TestBed } from '@angular/core/testing';

import { StatusAlertService } from './status-alert.service';

describe('StatusAlertService', () => {
  let service: StatusAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

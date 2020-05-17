import { TestBed } from '@angular/core/testing';

import { NgxWheelService } from './ngx-wheel.service';

describe('NgxWheelService', () => {
  let service: NgxWheelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxWheelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

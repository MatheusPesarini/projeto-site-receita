import { TestBed } from '@angular/core/testing';

import { SubmitRegisterForm } from './submit-register-form';

describe('SubmitRegisterForm', () => {
  let service: SubmitRegisterForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitRegisterForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

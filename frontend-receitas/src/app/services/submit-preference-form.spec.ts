import { TestBed } from '@angular/core/testing';

import { SubmitPreferenceForm } from './submit-preference-form';

describe('SubmitPreferenceForm', () => {
  let service: SubmitPreferenceForm;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitPreferenceForm);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

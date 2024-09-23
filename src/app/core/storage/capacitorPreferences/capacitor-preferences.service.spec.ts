import { TestBed } from '@angular/core/testing';

import { CapacitorPreferencesService } from './capacitor-preferences.service';

describe('CapacitorPreferencesService', () => {
  let service: CapacitorPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

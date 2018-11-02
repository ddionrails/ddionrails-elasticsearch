import { TestBed, inject } from '@angular/core/testing';

import { AutocompleteService } from './autocomplete.service';

describe('AutocompleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutocompleteService]
    });
  });

  it('should ...', inject([AutocompleteService], (service: AutocompleteService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { RechercheHistoriqueService } from './recherche-historique.service';

describe('RechercheHistoriqueService', () => {
  let service: RechercheHistoriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechercheHistoriqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

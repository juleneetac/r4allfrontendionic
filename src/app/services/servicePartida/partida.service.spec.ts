import { TestBed } from '@angular/core/testing';

import { PartidaService } from './partida.service';

describe('PartidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartidaService = TestBed.get(PartidaService);
    expect(service).toBeTruthy();
  });
});

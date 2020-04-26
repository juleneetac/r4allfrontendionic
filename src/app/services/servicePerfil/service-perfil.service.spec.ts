import { TestBed } from '@angular/core/testing';

import { ServicePerfilService } from './service-perfil.service';

describe('ServicePerfilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePerfilService = TestBed.get(ServicePerfilService);
    expect(service).toBeTruthy();
  });
});

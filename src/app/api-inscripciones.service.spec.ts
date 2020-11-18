import { TestBed } from '@angular/core/testing';

import { ApiInscripcionesService } from './api-inscripciones.service';

describe('ApiInscripcionesService', () => {
  let service: ApiInscripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInscripcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

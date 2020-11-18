import { TestBed } from '@angular/core/testing';

import { ApiListadoClientesService } from './api-listado-clientes.service';

describe('ApiListadoClientesService', () => {
  let service: ApiListadoClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiListadoClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

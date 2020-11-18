import { TestBed } from '@angular/core/testing';

import { ApiListadoPreciosService } from './api-listado-precios.service';

describe('ApiListadoPreciosService', () => {
  let service: ApiListadoPreciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiListadoPreciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

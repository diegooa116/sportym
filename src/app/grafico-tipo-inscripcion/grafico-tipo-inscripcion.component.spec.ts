import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTipoInscripcionComponent } from './grafico-tipo-inscripcion.component';

describe('GraficoTipoInscripcionComponent', () => {
  let component: GraficoTipoInscripcionComponent;
  let fixture: ComponentFixture<GraficoTipoInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoTipoInscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTipoInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

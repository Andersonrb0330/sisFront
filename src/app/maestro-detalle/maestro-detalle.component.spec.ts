import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroDetalleComponent } from './maestro-detalle.component';

describe('MaestroDetalleComponent', () => {
  let component: MaestroDetalleComponent;
  let fixture: ComponentFixture<MaestroDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaestroDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaestroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

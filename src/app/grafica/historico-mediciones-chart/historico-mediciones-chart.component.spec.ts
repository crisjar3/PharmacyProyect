import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoMedicionesChartComponent } from './historico-mediciones-chart.component';

describe('HistoricoMedicionesChartComponent', () => {
  let component: HistoricoMedicionesChartComponent;
  let fixture: ComponentFixture<HistoricoMedicionesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoMedicionesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoMedicionesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

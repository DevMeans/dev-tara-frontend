import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarResultanteComponent } from './listar-resultante.component';

describe('ListarResultanteComponent', () => {
  let component: ListarResultanteComponent;
  let fixture: ComponentFixture<ListarResultanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarResultanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarResultanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

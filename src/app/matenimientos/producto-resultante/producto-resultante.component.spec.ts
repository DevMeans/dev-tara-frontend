import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoResultanteComponent } from './producto-resultante.component';

describe('ProductoResultanteComponent', () => {
  let component: ProductoResultanteComponent;
  let fixture: ComponentFixture<ProductoResultanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoResultanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoResultanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

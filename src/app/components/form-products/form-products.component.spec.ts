import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductsComponent } from './form-products.component';

describe('FormProductsComponent', () => {
  let component: FormProductsComponent;
  let fixture: ComponentFixture<FormProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProductsComponent]
    });
    fixture = TestBed.createComponent(FormProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

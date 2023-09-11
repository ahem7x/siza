import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BundlecatalogitemComponent } from './bundlecatalogitem.component';

describe('BundlecatalogitemComponent', () => {
  let component: BundlecatalogitemComponent;
  let fixture: ComponentFixture<BundlecatalogitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundlecatalogitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BundlecatalogitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

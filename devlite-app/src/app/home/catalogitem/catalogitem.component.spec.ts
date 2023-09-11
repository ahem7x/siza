import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogitemComponent } from './catalogitem.component';

describe('CatalogitemComponent', () => {
  let component: CatalogitemComponent;
  let fixture: ComponentFixture<CatalogitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

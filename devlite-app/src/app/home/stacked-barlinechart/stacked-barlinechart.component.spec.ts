import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedBarlinechartComponent } from './stacked-barlinechart.component';

describe('StackedBarlinechartComponent', () => {
  let component: StackedBarlinechartComponent;
  let fixture: ComponentFixture<StackedBarlinechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedBarlinechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedBarlinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

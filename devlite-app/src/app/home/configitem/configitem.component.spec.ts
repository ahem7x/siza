import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigitemComponent } from './configitem.component';

describe('ConfigitemComponent', () => {
  let component: ConfigitemComponent;
  let fixture: ComponentFixture<ConfigitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

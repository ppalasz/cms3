import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Url404Component } from './url404.component';

describe('Url404Component', () => {
  let component: Url404Component;
  let fixture: ComponentFixture<Url404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Url404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Url404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

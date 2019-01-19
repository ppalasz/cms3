import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSqlComponent } from './admin-sql.component';

describe('AdminSqlComponent', () => {
  let component: AdminSqlComponent;
  let fixture: ComponentFixture<AdminSqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

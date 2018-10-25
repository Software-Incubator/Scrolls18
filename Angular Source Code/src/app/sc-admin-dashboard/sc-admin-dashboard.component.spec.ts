import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAdminDashboardComponent } from './sc-admin-dashboard.component';

describe('ScAdminDashboardComponent', () => {
  let component: ScAdminDashboardComponent;
  let fixture: ComponentFixture<ScAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

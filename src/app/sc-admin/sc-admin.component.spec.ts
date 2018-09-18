import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAdminComponent } from './sc-admin.component';

describe('ScAdminComponent', () => {
  let component: ScAdminComponent;
  let fixture: ComponentFixture<ScAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

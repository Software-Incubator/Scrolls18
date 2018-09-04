import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScLoginComponent } from './sc-login.component';

describe('ScLoginComponent', () => {
  let component: ScLoginComponent;
  let fixture: ComponentFixture<ScLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

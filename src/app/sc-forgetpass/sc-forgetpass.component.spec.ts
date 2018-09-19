import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScForgetpassComponent } from './sc-forgetpass.component';

describe('ScForgetpassComponent', () => {
  let component: ScForgetpassComponent;
  let fixture: ComponentFixture<ScForgetpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScForgetpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScForgetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

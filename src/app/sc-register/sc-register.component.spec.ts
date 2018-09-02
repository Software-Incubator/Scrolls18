import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScRegisterComponent } from './sc-register.component';

describe('ScRegisterComponent', () => {
  let component: ScRegisterComponent;
  let fixture: ComponentFixture<ScRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

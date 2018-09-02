import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScNavbarComponent } from './sc-navbar.component';

describe('ScNavbarComponent', () => {
  let component: ScNavbarComponent;
  let fixture: ComponentFixture<ScNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

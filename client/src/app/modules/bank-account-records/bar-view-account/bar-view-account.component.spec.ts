import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarViewAccountComponent } from './bar-view-account.component';

describe('BarViewAccountComponent', () => {
  let component: BarViewAccountComponent;
  let fixture: ComponentFixture<BarViewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarViewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarViewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

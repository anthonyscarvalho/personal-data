import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaViewComponent } from './ba-view.component';

describe('BaViewComponent', () => {
  let component: BaViewComponent;
  let fixture: ComponentFixture<BaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaAddComponent } from './ba-add.component';

describe('BaAddComponent', () => {
  let component: BaAddComponent;
  let fixture: ComponentFixture<BaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

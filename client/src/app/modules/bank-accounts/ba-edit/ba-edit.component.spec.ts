import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaEditComponent } from './ba-edit.component';

describe('BaEditComponent', () => {
  let component: BaEditComponent;
  let fixture: ComponentFixture<BaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

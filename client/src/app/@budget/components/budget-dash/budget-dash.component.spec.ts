import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDashComponent } from './budget-dash.component';

describe('BudgetDashComponent', () => {
  let component: BudgetDashComponent;
  let fixture: ComponentFixture<BudgetDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDashBarComponent } from './budget-dash-bar.component';

describe('BudgetDashBarComponent', () => {
  let component: BudgetDashBarComponent;
  let fixture: ComponentFixture<BudgetDashBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetDashBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetDashBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

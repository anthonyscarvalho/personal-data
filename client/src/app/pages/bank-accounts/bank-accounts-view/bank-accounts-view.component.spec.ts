import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsViewComponent } from './bank-accounts-view.component';

describe('BankAccountsViewComponent', () => {
  let component: BankAccountsViewComponent;
  let fixture: ComponentFixture<BankAccountsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

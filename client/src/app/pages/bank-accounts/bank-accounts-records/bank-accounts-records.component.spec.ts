import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsRecordsComponent } from './bank-accounts-records.component';

describe('BankAccountsRecordsComponent', () => {
  let component: BankAccountsRecordsComponent;
  let fixture: ComponentFixture<BankAccountsRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountsRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountsRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

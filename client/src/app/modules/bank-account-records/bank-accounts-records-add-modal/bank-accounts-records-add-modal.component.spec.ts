import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsRecordsAddModalViewComponent } from './bank-accounts-records-add-modal.component';

describe('BankAccountsRecordsComponent', () => {
  let component: BankAccountsRecordsAddModalViewComponent;
  let fixture: ComponentFixture<BankAccountsRecordsAddModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountsRecordsAddModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountsRecordsAddModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

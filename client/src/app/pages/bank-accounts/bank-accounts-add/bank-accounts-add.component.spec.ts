import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsAddComponent } from './bank-accounts-add.component';

describe('BankAccountsAddComponent', () => {
  let component: BankAccountsAddComponent;
  let fixture: ComponentFixture<BankAccountsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

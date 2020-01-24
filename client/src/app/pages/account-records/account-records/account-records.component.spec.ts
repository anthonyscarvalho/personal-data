import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecordsComponent } from './account-records.component';

describe('AccountRecordsComponent', () => {
  let component: AccountRecordsComponent;
  let fixture: ComponentFixture<AccountRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

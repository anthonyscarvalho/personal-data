import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAddModalViewComponent } from './bar-add-modal.component';

describe('BankAccountsRecordsComponent', () => {
  let component: BarAddModalViewComponent;
  let fixture: ComponentFixture<BarAddModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarAddModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAddModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

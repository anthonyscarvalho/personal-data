import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalRecordsComponent } from './journal-records.component';

describe('JournalRecordsComponent', () => {
  let component: JournalRecordsComponent;
  let fixture: ComponentFixture<JournalRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

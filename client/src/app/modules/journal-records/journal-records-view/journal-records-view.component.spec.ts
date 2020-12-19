import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalRecordsViewComponent } from './journal-records-view.component';

describe('JournalRecordsViewComponent', () => {
  let component: JournalRecordsViewComponent;
  let fixture: ComponentFixture<JournalRecordsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalRecordsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalRecordsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

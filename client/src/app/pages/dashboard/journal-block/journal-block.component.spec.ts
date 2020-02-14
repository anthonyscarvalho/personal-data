import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalBlockComponent } from './journal-block.component';

describe('JournalBlockComponent', () => {
  let component: JournalBlockComponent;
  let fixture: ComponentFixture<JournalBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

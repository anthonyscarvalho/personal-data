import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalsViewComponent } from './journal-view.component';

describe('JournalsViewComponent', () => {
  let component: JournalsViewComponent;
  let fixture: ComponentFixture<JournalsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

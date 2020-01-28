import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecordsViewComponent } from './account-records-view.component';

describe('AccountRecordsViewComponent', () => {
	let component: AccountRecordsViewComponent;
	let fixture: ComponentFixture<AccountRecordsViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountRecordsViewComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountRecordsViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecordsReportComponent } from './account-records-report.component';

describe('AccountRecordsReportComponent', () => {
	let component: AccountRecordsReportComponent;
	let fixture: ComponentFixture<AccountRecordsReportComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountRecordsReportComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountRecordsReportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

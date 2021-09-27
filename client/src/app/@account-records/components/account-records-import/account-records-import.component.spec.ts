import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { AccountRecordsImportComponent } from './account-records-import.component';

describe('AccountRecordsImportComponent', () => {
	let component: AccountRecordsImportComponent;
	let fixture: ComponentFixture<AccountRecordsImportComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountRecordsImportComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountRecordsImportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

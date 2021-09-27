import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { AccountRecordsEditComponent } from './account-records-edit.component';

describe('AccountRecordsEditComponent', () => {
	let component: AccountRecordsEditComponent;
	let fixture: ComponentFixture<AccountRecordsEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccountRecordsEditComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccountRecordsEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

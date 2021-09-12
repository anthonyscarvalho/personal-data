import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsEditComponent } from './bank-accounts-edit.component';

describe('BankAccountsEditComponent', () => {
	let component: BankAccountsEditComponent;
	let fixture: ComponentFixture<BankAccountsEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BankAccountsEditComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BankAccountsEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

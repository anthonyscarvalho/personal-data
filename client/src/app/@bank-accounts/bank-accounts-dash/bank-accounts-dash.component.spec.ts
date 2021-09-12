import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsDashComponent } from './bank-accounts-dash.component';

describe('BankAccountsDashComponent', () => {
	let component: BankAccountsDashComponent;
	let fixture: ComponentFixture<BankAccountsDashComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BankAccountsDashComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BankAccountsDashComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

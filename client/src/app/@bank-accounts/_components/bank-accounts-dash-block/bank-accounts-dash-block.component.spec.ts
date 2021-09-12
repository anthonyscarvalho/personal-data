import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsDashBlockComponent } from './bank-accounts-dash-block.component';

describe('BankAccountsDashBlockComponent', () => {
	let component: BankAccountsDashBlockComponent;
	let fixture: ComponentFixture<BankAccountsDashBlockComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [BankAccountsDashBlockComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BankAccountsDashBlockComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

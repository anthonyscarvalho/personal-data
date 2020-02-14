import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

import { NavigationInterface } from '../../interfaces/navigation';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
	animations: [
		trigger('openClose', [
			// ...
			state('open', style({
				'max-height': '500px',
				opacity: '1',
				visibility: 'visible'
			})),
			state('closed', style({
				'max-height': '0px',
				opacity: '0',
				visibility: 'hidden'
			})),
			transition('open => closed', [group([
				animate('400ms ease-in-out', style({
					opacity: '0'
				})),
				animate('600ms ease-in-out', style({
					'max-height': '0px'
				})),
				animate('700ms ease-in-out', style({
					visibility: 'hidden'
				}))
			]
			)]),
			transition('closed => open', [group([
				animate('1ms ease-in-out', style({
					visibility: 'visible'
				})),
				animate('600ms ease-in-out', style({
					'max-height': '500px'
				})),
				animate('800ms ease-in-out', style({
					opacity: '1'
				}))
			])])
		]),
	]
})
export class NavigationComponent implements OnInit {
	navItems: NavigationInterface[] = [
		{
			icon: ``,
			name: `Dashboard`,
			link: ``,
		}, {
			icon: ``,
			name: `Accounts`,
			link: `accounts`,
			showChildren: false,
			children: [
				{
					icon: `search`,
					name: `View`,
					link: `view`,
				}, {
					icon: `plus`,
					name: `Add`,
					link: `add`,
				}
			]
		}, {
			icon: ``,
			name: `Account Records`,
			link: `account-records`,
			showChildren: false,
			children: [
				{
					icon: `search`,
					name: `View`,
					link: `view`,
				}, {
					icon: `plus`,
					name: `Add`,
					link: `add`,
				}
			]
		}, {
			icon: ``,
			name: `Journals`,
			link: `journals`,
			showChildren: false,
			children: [
				{
					icon: `search`,
					name: `View`,
					link: `view`,
				}, {
					icon: `plus`,
					name: `Add`,
					link: `add`,
				}
			]
		}, {
			icon: ``,
			name: `Journal Records`,
			link: `journal-records`,
			showChildren: false,
			children: [
				{
					icon: `search`,
					name: `View`,
					link: `view`,
				}, {
					icon: `plus`,
					name: `Add`,
					link: `add`,
				}
			]
		}
	];

	constructor() {
	}

	ngOnInit() {
		this.showPreviousMenu();
	}

	showChildren(pNavItem) {
		let show = false;
		if (pNavItem.showChildren) {
			show = false;
		} else {
			show = true;
		}
		this.navItems.map(pItem => {
			pItem.showChildren = false;
		});
		if (pNavItem.children) {
			pNavItem.showChildren = show;
		}
	}

	showPreviousMenu() {
		const activeMenu = localStorage.getItem('activeMenu');
		if (activeMenu !== '') {
			this.navItems.map(pItem => {
				if (pItem.link === activeMenu) {
					pItem.showChildren = true;
				} else {
					pItem.showChildren = false;
				}
			});
		}
	}
}

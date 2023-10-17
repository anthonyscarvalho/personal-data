import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

// module
import { CommonComponentsModule } from '@common/common.module';
import {
	FilesDashComponent,
	FilesEditComponent,
	FilesViewComponent,
} from '@files/views';
import { FileBlockComponent } from './components/file-block/file-block.component';

const megaMenu = {
	label: `Management`,
	options: [{
		name: 'Files',
		url: 'files',
		order: 1,
		icon: 'folder',
		children: [
			{
				name: 'View',
				url: 'view',
				order: 1,
				icon: 'eye',
			},
			{
				name: 'Add',
				url: 'add',
				order: 2,
				icon: 'plus',
			}
		]
	},],
};

const routes: Routes = [
	{
		path: 'files',
		children: [
			{ path: '', component: FilesDashComponent },
			{ path: 'view', component: FilesViewComponent },
			{ path: 'add', component: FilesEditComponent, data: { add: true } },
			{ path: 'edit/:id', component: FilesEditComponent, data: { add: false } },
		],
		data: { menu: megaMenu, module: `files` }
	},
];

@NgModule({
	declarations: [
		// components
		// views
		FilesDashComponent,
		FilesEditComponent,
		FilesViewComponent,
  FileBlockComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		CommonComponentsModule,
	],
	exports: [RouterModule]
})
export class FilesModule { }

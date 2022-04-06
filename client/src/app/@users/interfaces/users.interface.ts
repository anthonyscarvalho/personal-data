export class UserModel {
	_id: string;
	username: string;
	password: string;
	name: string;
	surname: string;
	emailAddress: string;
	lastLogin: string;
	roles: string;
	accessList: string;
	access: string;
	created: string;
	canceled: string;
	canceledDate: string;

	constructor(pModel = null) {
		this._id = (pModel ? (pModel._id ? pModel._id : null) : null);
		this.username = (pModel ? (pModel.username ? pModel.username : null) : null);
		this.password = (pModel ? (pModel.password ? pModel.password : null) : null);
		this.name = (pModel ? (pModel.name ? pModel.name : null) : null);
		this.surname = (pModel ? (pModel.surname ? pModel.surname : null) : null);
		this.emailAddress = (pModel ? (pModel.emailAddress ? pModel.emailAddress : null) : null);
		this.lastLogin = (pModel ? (pModel.lastLogin ? pModel.lastLogin : null) : null);
		this.roles = (pModel ? (pModel.roles ? pModel.roles : null) : null);
		this.accessList = (pModel ? (pModel.accessList ? pModel.accessList : null) : null);
		this.access = (pModel ? (pModel.access ? pModel.access : null) : null);
		this.created = (pModel ? (pModel.created ? pModel.created : null) : null);
		this.canceled = (pModel ? (pModel.canceled ? pModel.canceled : 'false') : 'false');
		this.canceledDate = (pModel ? (pModel.canceledDate ? pModel.canceledDate : null) : null);
	}
}

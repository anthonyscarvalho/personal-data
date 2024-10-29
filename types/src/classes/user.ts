import { cCommonProperties } from "./common-properties";
import type { tUser } from "../interfaces/user";

export class cUser extends cCommonProperties implements tUser {
	_id: any;
	username: string;
	password: string;
	name: string;
	surname: string;
	emailAddress: string;
	lastLogin: string;
	roles: string;
	accessList: string;
	access: string;

	constructor(pModel: any = null) {
		super(pModel);
		if (pModel?._id) {
			this._id = pModel?._id || null;
		}
		this.username = pModel?.username || null;
		this.password = pModel?.password || null;
		this.name = pModel?.name || null;
		this.surname = pModel?.surname || null;
		this.emailAddress = pModel?.emailAddress || null;
		this.lastLogin = pModel?.lastLogin || [];
		this.roles = pModel?.roles || null;
		this.accessList = pModel?.accessList || null;
		this.access = pModel?.access || 0;
	}
}

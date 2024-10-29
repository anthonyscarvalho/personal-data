import type { tCommonProperties } from "./common-properties";

export type tUser = {
	_id?: any;
	username: string;
	password: string;
	name: string;
	surname: string;
	emailAddress: string;
	lastLogin: string;
	roles: string;
	accessList: string;
	access: string;
} & tCommonProperties;

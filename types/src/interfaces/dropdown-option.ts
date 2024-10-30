export type tDropDownOption = {
	label: string,
	options: tDropdownOptions[],
	options2?: {
		bank: string,
		accounts: tDropdownOptions[]
	}[]
}

type tDropdownOptions = {
	label: string,
	value: string
}

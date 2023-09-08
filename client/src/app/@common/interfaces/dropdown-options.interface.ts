export interface DropDownOptionsModel {
	label: string,
	options: dropdownOption[],
	options2?: {
		bank: string,
		accounts: dropdownOption[]
	}[]
}

interface dropdownOption {
	label: string,
	value: string
}

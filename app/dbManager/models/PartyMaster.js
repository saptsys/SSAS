import _BaseModel from "./_BaseModel";

class PartyMaster extends _BaseModel {
	constructor({
		name,
		type,
		phone,
		mobile,
		address,
		email,
		city,
		stateCode,
		isActive,
		gstin,
		pan,
		system,
		...rest
	} = {}
	) {
		super(rest)
		this.name = name;
		this.type = type;
		this.phone = phone;
		this.mobile = mobile;
		this.address = address;
		this.email = email;
		this.city = city;
		this.stateCode = stateCode;
		this.isActive = isActive;
		this.gstin = gstin;
		this.pan = pan;
		this.system = system;
	}
}
export default PartyMaster

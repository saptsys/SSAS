
class PartyMaster {
    constructor({
        id,
        createdAt,
        createdBy,
        modifiedAt,
        modifiedBy,
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
        system } = {}
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.modifiedAt = modifiedAt;
        this.modifiedBy = modifiedBy;
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
        this.system = system
    }
}

module.exports = PartyMaster 
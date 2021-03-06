
const _BaseModel = require("./_BaseModel");

class BillsDetail extends _BaseModel {
	constructor({
		id,
		createdAt,
		createdBy,
		modifiedAt,
		modifiedBy,
		description,
		quantity,
		rate,
		amount,
		billsTransactionId,
		itemMasterId,
		itemUnitMasterId,
		...rest
	} = {}
	) {
		super(rest),
			this.id = id;
		this.createdAt = createdAt;
		this.createdBy = createdBy;
		this.modifiedAt = modifiedAt;
		this.modifiedBy = modifiedBy;
		this.description = description;
		this.quantity = quantity;
		this.rate = rate;
		this.amount = amount;
		this.billsTransactionId = billsTransactionId;
		this.itemMasterId = itemMasterId;
		this.itemUnitMasterId = itemUnitMasterId;
	}
}
module.exports = BillsDetail
exports.ids=[2],exports.modules={"./app/dbManager/models/BillsDetail.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,description:r,quantity:o,rate:d,amount:n,billsTransactionId:c,itemMasterId:h,itemUnitMasterId:l,...m}={}){super(m),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.description=r,this.quantity=o,this.rate=d,this.amount=n,this.billsTransactionId=c,this.itemMasterId=h,this.itemUnitMasterId=l}}},"./app/dbManager/models/BillsTransaction.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,tag:r,billing:o,billNumber:d,billDate:n,voucherNumber:c,challanNumber:h,chalanDate:l,dueDate:m,grossAmount:p,discountPercentage:u,discountAmount:y,SGSTPercentage:M,SGSTAmount:g,CGSTPercentage:A,CGSTAmount:f,IGSTPercentage:B,IGSTAmount:b,ferightPercentage:j,freightAmount:x,commisionPercentage:v,commisionAmount:I,otherAmount:T,netAmount:C,remarks:D,partyMasterId:P,...S}={}){super(S),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.tag=r,this.billing=o,this.billNumber=d,this.billDate=n,this.voucherNumber=c,this.challanNumber=h,this.chalanDate=l,this.dueDate=m,this.grossAmount=p,this.discountPercentage=u,this.discountAmount=y,this.SGSTPercentage=M,this.SGSTAmount=g,this.CGSTPercentage=A,this.CGSTAmount=f,this.IGSTPercentage=B,this.IGSTAmount=b,this.ferightPercentage=j,this.freightAmount=x,this.commisionPercentage=v,this.commisionAmount=I,this.otherAmount=T,this.netAmount=C,this.remarks=D,this.partyMasterId=P}}},"./app/dbManager/models/DeliveryDetail.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,description:r,quantity:o,rate:d,amount:n,deliveryTransactionId:c,itemMasterId:h,unitMasterId:l,...m}={}){super(m),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.description=r,this.quantity=o,this.rate=d,this.amount=n,this.deliveryTransactionId=c,this.itemMasterId=h,this.unitMasterId=l}}},"./app/dbManager/models/DeliveryTransaction.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,voucherNumber:r,challanNumber:o,challanDateDate:d,grossAmount:n,netAmount:c,remarks:h,partyMasterId:l,...m}={}){super(m),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.voucherNumber=r,this.challanNumber=o,this.challanDateDate=d,this.grossAmount=n,this.netAmount=c,this.remarks=h,this.partyMasterId=l}}},"./app/dbManager/models/ItemGroupMaster.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,name:r,code:o,isActive:d,system:n,...c}={}){super(c),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.name=r,this.code=o,this.isActive=d,this.system=n}}},"./app/dbManager/models/ItemMaster.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,name:r,code:o,description:d,salePrice:n,purchasePrice:c,itemTaxable:h,HSNCode:l,VATRate:m,additionalTax:p,isActive:u,system:y,itemUnitMasterId:M,itemGroupMasterId:g,taxMasterId:A,...f}={}){super(f),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.name=r,this.code=o,this.description=d,this.salePrice=n,this.purchasePrice=c,this.itemTaxable=h,this.HSNCode=l,this.VATRate=m,this.additionalTax=p,this.isActive=u,this.system=y,this.itemGroupMasterId=g,this.itemUnitMasterId=M,this.taxMasterId=A}}},"./app/dbManager/models/ItemUnitMaster.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,name:r,code:o,description:d,isActive:n,system:c,...h}={}){super(h),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.name=r,this.code=o,this.description=d,this.isActive=n,this.system=c}}},"./app/dbManager/models/PartyMaster.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({name:e,type:t,phone:s,mobile:i,address:a,email:r,city:o,stateCode:d,isActive:n,gstin:c,pan:h,system:l,...m}={}){super(m),this.name=e,this.type=t,this.phone=s,this.mobile=i,this.address=a,this.email=r,this.city=o,this.stateCode=d,this.isActive=n,this.gstin=c,this.pan=h,this.system=l}}},"./app/dbManager/models/SettingsMaster.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,key:r,type:o,options:d,description:n,defaultValue:c,currentValue:h,system:l,...m}={}){super(m),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.key=r,this.type=o,this.options=d,this.description=n,this.defaultValue=c,this.currentValue=h,this.system=l}}},"./app/dbManager/models/TaxMaster.js":function(e,t,s){const i=s("./app/dbManager/models/_BaseModel.js");e.exports=class extends i{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a,name:r,code:o,description:d,isActive:n,system:c,taxPercentage:h,...l}={}){super(l),this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a,this.name=r,this.code=o,this.description=d,this.isActive=n,this.system=c,this.taxPercentage=h}}},"./app/dbManager/models/_BaseModel.js":function(e,t){e.exports=class{constructor({id:e,createdAt:t,createdBy:s,modifiedAt:i,modifiedBy:a}={}){this.id=e,this.createdAt=t,this.createdBy=s,this.modifiedAt=i,this.modifiedBy=a}}},"./app/dbManager/models/index.js":function(e,t,s){const i=s("./app/dbManager/models/BillsDetail.js"),a=s("./app/dbManager/models/BillsTransaction.js"),r=s("./app/dbManager/models/DeliveryDetail.js"),o=s("./app/dbManager/models/DeliveryTransaction.js"),d=s("./app/dbManager/models/ItemGroupMaster.js"),n=s("./app/dbManager/models/ItemMaster.js"),c=s("./app/dbManager/models/ItemUnitMaster.js"),h=s("./app/dbManager/models/PartyMaster.js"),l=s("./app/dbManager/models/SettingsMaster.js"),m=s("./app/dbManager/models/TaxMaster.js");e.exports={BillsDetail:i,BillsTransaction:a,DeliveryDetail:r,DeliveryTransaction:o,ItemGroupMaster:d,ItemMaster:n,ItemUnitMaster:c,PartyMaster:h,SettingsMaster:l,TaxMaster:m}},"./app/electron/main-processes/ipc-calls/DeliveryChallanIPC.js":function(e,t,s){const i=s("electron-promise-ipc"),a=e=>"DeliveryChallan/"+e,r=new(s("./app/electron/services/DeliveryChallanService.js"));i.on(a("getAll"),()=>r.getAll()),i.on(a("save"),e=>r.save(e)),i.on(a("getById"),e=>r.getById(e)),i.on(a("delete"),e=>r.delete(e))},"./app/electron/services/DeliveryChallanService.js":function(e,t,s){const i=s("./app/electron/services/__BaseService.js"),a=s("./app/dbManager/models/index.js"),{getConnection:r}=s("typeorm");e.exports=class extends i{constructor(){super(a.DeliveryTransaction)}}},"./app/electron/services/__BaseService.js":function(e,t,s){const{getConnection:i,Not:a}=s("typeorm");e.exports=class{constructor(e){this.ModelClass=e,this.connection=i(),this.repository=this.connection.getRepository(e)}getAll(){return this.repository.find()}getById(e){return this.repository.findOneOrFail(e)}create(e,t=[],s=null){const i=new this.ModelClass(e);return this.withUniqueChecking(i,t,s).then(()=>this.repository.create(i))}update(e,t=[],s=null){const i=new this.ModelClass(e);return this.withUniqueChecking(i,t,s).then(()=>this.repository.update(i.id,i))}save(e,t=[],s=null){const i=new this.ModelClass(e);return this.withUniqueChecking(i,t,s).then(()=>this.repository.save(i))}delete(e){return i().transaction(t=>{const s=t.getRepository(this.ModelClass);return s?s.findOne(e).then(i=>(s.metadata.ownUniques.forEach(t=>{t.columns.filter(e=>"text"===e.type).forEach(t=>{i[t.propertyName]=i[t.propertyName]+"__del_"+e})}),t.update(this.ModelClass,e,i).then(()=>t.softDelete(this.ModelClass,e)))):Promise.reject("Something went wrong repository not found.")})}deleteHard(e){return this.repository.delete(e)}withUniqueChecking(e,t,s){if(t.length){let i={};return t.forEach(t=>i[t]=e[t]),this.doCheckUnique({fields:i,id:e.id,uniqueRejectMessage:s})}return Promise.resolve(!0)}doCheckUnique({fields:e,id:t,uniqueRejectMessage:s}){return console.log(e,t),this.repository.findOne({...e,id:a(null!=t?t:0)}).then(t=>t?Promise.reject({message:null!=s?s:Object.keys(e).map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(", ")+" already exist"}):Promise.resolve(!0)).catch(e=>Promise.reject(e))}}}};
//# sourceMappingURL=2.main.prod.js.map

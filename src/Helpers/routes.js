export const ROUTES = {
    dashboard: {
        _path: "/dashboard"
    },
    masters: {
        _path: "/masters",
        partyMaster: {
            _path: "/masters/party-master"
        },
        item: {
            _path: '/item',
            itemGroupMaster: {
                _path: "/item/item-group-master"
            },
            itemMaster: {
                _path: "/item/item-master"
            },
            unitMaster: {
                _path: "/item/unit-master"
            }
        }
    },
    transactions: {
        _path: '/transactions',
        sales: {
            _path: '/transactions/sales',
            salesInvoice: {
                _path: '/transactions/sales/sales-invoice'
            }
        },
        purchase: {
            _path: '/purchase',
            purchaseInvoice: {
                _path: '/transactions/purchase/purchase-invoice'
            }
        },
        deliveryChallan: {
            _path: '/transactions/delivery-challan'
        }
    },
    reports: {
        _path: '/reports',
        deliveryChallan: {
            _path: '/reports/delivery-challan',
            partyWise: {
                _path: '/reports/delivery-challan/party-wise'
            },
            itemWise: {
                _path: '/reports/delivery-challan/item-wise'
            }
        }
    },
    utility: {
        _path: 'utility',
        firmInfo: {
            _path: 'firm-info'
        },
        settings: {
            _path: 'settings'
        }
    }
}


// export function generateUrl(objecKeys) {
//     console.log("Generating URL...")

//     let currentObject = { ...ROUTES }
//     let url = ""
//     objecKeys.split('.').forEach(obj => {
//         url += "/" + currentObject[obj].path
//         currentObject = currentObject[obj]
//     });
//     return url;
// }
export function generateUrlChain(objPath) {
    console.log("getting chain of key ...")

    let final = []
    let last = []
    objPath.split("/").filter(x => x).forEach(u => {
        last = last + "/" + u
        final.push(last)
    })
    return final
}
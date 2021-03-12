export const MODULE_ROUTES = {
  dashboard: {
    _path: "/dashboard",
    _title: "Dashboard",
  },
  masters: {
    _path: "/masters",
    partyMaster: {
      _path: "/masters/party-master",
      _title: "Party Master",
    },
    item: {
      _path: "/masters/item",
      itemGroupMaster: {
        _path: "/masters/item/item-group-master",
        _title: "Item Group Master",
      },
      itemMaster: {
        _path: "/masters/item/item-master",
        _title: "Item Master",
      },
      unitMaster: {
        _path: "/masters/item/unit-master",
        _title: "Unit Master",
      },
    },
    taxMaster: {
      _path: "/masters/tax-master",
      _title: "Tax Master",
    },
  },
  transactions: {
    _path: "/transactions",
    sales: {
      _path: "/transactions/sales",
      salesInvoice: {
        _path: "/transactions/sales/sales-invoice",
        _title: "Sales Invoice",
      },
    },
    purchase: {
      _path: "/purchase",
      purchaseInvoice: {
        _path: "/transactions/purchase/purchase-invoice",
        _title: "Purchase Invoice",
      },
    },
    deliveryChallan: {
      _path: "/transactions/delivery-challan",
      _title: "Delivery Challan",
    },
  },
  reports: {
    _path: "/reports",
    deliveryChallan: {
      _path: "/reports/delivery-challan",
      partyWise: {
        _path: "/reports/delivery-challan/party-wise",
        _title: "Delivery Challan Report",
      },
      // itemWise: {
      //     _path: '/reports/delivery-challan/item-wise'
      // }
    },
  },
  utility: {
    _path: "/utility",
    firmInfo: {
      _path: "/firm-info",
    },
    settings: {
      _path: "/settings",
    },
  },
};

export const MODAL_ROUTES = {
  firmInfoModal: {
    _path: "/modal/firm-info",
    _title: "Firm Info"
  }
}

export function generateUrlChain(objPath) {
  let final = [];
  let last = [];
  objPath
    .split("/")
    .filter((x) => x)
    .forEach((u) => {
      last = last + "/" + u;
      final.push(last);
    });
  return final;
}

export function getTitleByUrl(url, routeObj = MODULE_ROUTES) {
  let title = "";
  const keys = Object.keys(routeObj).filter(
    (x) => !(x === "_path" || x === "_title")
  );
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (routeObj[key]._path === url) {
      return routeObj[key]._title;
    } else {
      title = getTitleByUrl(url, routeObj[key]);
    }
    if (title) return title;
  }
}

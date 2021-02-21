import React from "react";
import {
  Select,
} from "antd";
import { useDispatch } from "react-redux";
import { ItemGroupMasterActions } from "./../../../_redux/actionFiles/ItemGroupMasterRedux";
import { ItemUnitMasterActions } from "./../../../_redux/actionFiles/ItemUnitMasterRedux";
import { TaxMasterActions } from "./../../../_redux/actionFiles/TaxMasterRedux";
import { ItemMasterActions } from "./../../../_redux/actionFiles/ItemMasterRedux";

export const TaxDropdown = (props) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const triggerChange = (changedValue) => {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  };

  React.useEffect(() => {
    dispatch(TaxMasterActions.getAll()).then((res) => {
      setOptions(res);
    });
  }, []);


  return (
    <Select
      value={props.value}
      showSearch
      optionFilterProp="label"
      options={(props.filter ? props.filter(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })
      }
      tabIndex="6"
      showAction="focus"
      onChange={triggerChange}
      allowClear={true}
    />
  )
}

export const ItemGroupDropdown = (props) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const triggerChange = (changedValue) => {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  };

  React.useEffect(() => {
    dispatch(ItemGroupMasterActions.getAll()).then((res) => {
      setOptions(res);
    });
  }, []);

  return (
    <Select
      value={props.value}
      showSearch
      optionFilterProp="label"
      options={(props.filter ? props.filter(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })
      }      tabIndex="6"
      showAction="focus"
      onChange={triggerChange}
      allowClear={true}
    />
  )
}

export const ItemUnitDropdown = (props) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const triggerChange = (changedValue) => {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  };

  React.useEffect(() => {
    dispatch(ItemUnitMasterActions.getAll()).then((res) => {
      setOptions(res );
    });
  }, []);

  return (
    <Select
      value={props.value}
      showSearch
      optionFilterProp="label"
      options={(props.filter ? props.filter(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })
      }      tabIndex="6"
      showAction="focus"
      onChange={triggerChange}
      allowClear={true}
    />
  )
}

export const ItemDropdown = (props) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const triggerChange = (changedValue) => {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  };

  React.useEffect(() => {
    dispatch(ItemMasterActions.getAll()).then((res) => {
      setOptions(res);
    });
  }, []);

  return (
    <Select
      value={props.value}
      showSearch
      optionFilterProp="label"
      options={(props.filter ? props.filter(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })
      }      tabIndex="6"
      showAction="focus"
      onChange={triggerChange}
      allowClear={true}
    />
  )
}
import React from "react";
import {
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ItemGroupMasterActions } from "./../../../_redux/actionFiles/ItemGroupMasterRedux";
import { ItemUnitMasterActions } from "./../../../_redux/actionFiles/ItemUnitMasterRedux";
import { TaxMasterActions } from "./../../../_redux/actionFiles/TaxMasterRedux";
import { ItemMasterActions } from "./../../../_redux/actionFiles/ItemMasterRedux";

export const TaxDropdown = ({ filterForOptions, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.TaxMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!props.options)
      dispatch(TaxMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
  }, []);

  return (
    <Select
      options={(filterForOptions ? filterForOptions(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })}
      {...props}
      showSearch
      optionFilterProp="label"
      showAction="focus"
      allowClear={true}
      loading={isLoading}
    />
  )
}

export const ItemGroupDropdown = ({ filterForOptions, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemGroupMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!props.options)
      dispatch(ItemGroupMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
  }, []);

  return (
    <Select
      options={(filterForOptions ? filterForOptions(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })}
      {...props}
      showSearch
      optionFilterProp="label"
      showAction="focus"
      allowClear={true}
      loading={isLoading}
    />
  )
}

export const ItemUnitDropdown = ({ filterForOptions, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemUnitMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!props.options)
      dispatch(ItemUnitMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
  }, []);

  return (
    <Select
      options={(filterForOptions ? filterForOptions(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })}
      {...props}
      showSearch
      optionFilterProp="label"
      showAction="focus"
      allowClear={true}
      loading={isLoading}
    />
  )
}

export const ItemDropdown = ({ filterForOptions, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!props.options)
      dispatch(ItemMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
  }, []);

  return (
    <Select
      options={(filterForOptions ? filterForOptions(options) : options).map((x) => {
        return {
          label: x.name,
          value: x.id,
        };
      })}
      {...props}
      showSearch
      optionFilterProp="label"
      showAction="focus"
      allowClear={true}
      loading={isLoading}
    />
  )
}
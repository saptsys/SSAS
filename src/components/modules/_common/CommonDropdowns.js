import React from "react";
import {
  Form,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ItemGroupMasterActions } from "./../../../_redux/actionFiles/ItemGroupMasterRedux";
import { ItemUnitMasterActions } from "./../../../_redux/actionFiles/ItemUnitMasterRedux";
import { TaxMasterActions } from "./../../../_redux/actionFiles/TaxMasterRedux";
import { ItemMasterActions } from "./../../../_redux/actionFiles/ItemMasterRedux";
import AccountTypes from "../../../../Constants/AccountTypes";

export const TaxDropdown = ({ propsForSelect = {}, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.TaxMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!propsForSelect.options) {
      dispatch(TaxMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
    }
    return () => setOptions([])
  }, []);
  return (
    <Form.Item {...props}>
      <Select
        options={(propsForSelect.filterForOptions ? propsForSelect.filterForOptions(options) : options).map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
        loading={isLoading}
      />
    </Form.Item>
  )
}

export const ItemGroupDropdown = ({ propsForSelect = {}, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemGroupMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!propsForSelect.options)
      dispatch(ItemGroupMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
    return () => setOptions([])
  }, []);

  return (
    <Form.Item {...props}>

      <Select
        options={(propsForSelect.filterForOptions ? propsForSelect.filterForOptions(options) : options).map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
        loading={isLoading}
      />
    </Form.Item>
  )
}

export const ItemUnitDropdown = ({ propsForSelect = {}, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemUnitMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!propsForSelect.options)
      dispatch(ItemUnitMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
    return () => setOptions([])
  }, []);

  return (
    <Form.Item {...props}>
      <Select
        options={(propsForSelect.filterForOptions ? propsForSelect.filterForOptions(options) : options).map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
        loading={isLoading}
      />
    </Form.Item>
  )
}

export const ItemDropdown = ({ propsForSelect = {}, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!propsForSelect.options)
      dispatch(ItemMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
    return () => setOptions([])
  }, []);

  return (
    <Form.Item {...props}>
      <Select
        options={(propsForSelect.filterForOptions ? propsForSelect.filterForOptions(options) : options).map((x) => {
          return {
            label: x.name,
            value: x.id,
          };
        })}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
        loading={isLoading}
      />
    </Form.Item>
  )
}

export const AccountTypesDropdown = ({ propsForSelect = {}, ...props }) => {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (!propsForSelect.options)
      setOptions(AccountTypes)
    return () => setOptions([])
  }, []);

  return (
    <Form.Item {...props}>
      <Select
        options={options}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
      />
    </Form.Item>
  )
}
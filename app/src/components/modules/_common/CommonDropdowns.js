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
import States from "../../../../Constants/States";
import { PartyMasterActions } from "../../../_redux/actionFiles/PartyMasterRedux";

const propsKeyToskip = ["propsForSelect"]
const propsNotToCall = ["shouldUpdate", "onReset"]
const formItemPropGenerator = (props) => {
  return Object.keys(props)
    .filter(x => !propsKeyToskip.includes(x)) //skip property which we reserved for sub elm select
    .reduce((occ, cur) => (
      {
        ...occ,
        [cur]: (typeof props[cur] === "function" && !propsNotToCall.includes(cur) //properties which is we are not call when assigning ex. onReset etc.
          ? props[cur]()
          : props[cur])
      }), {})
}

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

  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
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
        defaultActiveFirstOption={false}
      />
    </Form.Item>
  )

  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
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
  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
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
        defaultActiveFirstOption={false}
      />
    </Form.Item>)
  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
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
  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
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
        defaultActiveFirstOption={false}
      />
    </Form.Item>)
  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
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
  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
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
        defaultActiveFirstOption={false}
      />
    </Form.Item>)
  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
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
  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
      <Select
        options={options}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
        defaultActiveFirstOption={false}
      />
    </Form.Item>)
  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
    </Form.Item>
  )
}

export const StatesDropdown = ({ propsForSelect = {}, ...props }) => {
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (!propsForSelect.options)
      setOptions(States)
    return () => setOptions([])
  }, []);
  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
      <Select
        options={options.map(x => ({ label: x.stateName + ` (${x.code})`, value: x.tin }))}
        {...propsForSelect}
        showSearch
        optionFilterProp="label"
        showAction="focus"
        allowClear={true}
        defaultActiveFirstOption={false}
      />
    </Form.Item>)
  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
    </Form.Item>
  )
}


export const PartyDropdown = ({ propsForSelect = {}, ...props }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = React.useState([]);
  const isLoading = useSelector(s => s.ItemMaster.list.loading === "getAll")

  React.useEffect(() => {
    if (!propsForSelect.options)
      dispatch(PartyMasterActions.getAll()).then((res) => {
        setOptions(res);
      });
    return () => setOptions([])
  }, []);
  const subItem = () => (
    <Form.Item {...formItemPropGenerator(props)}>
      <Select
        options={
          (propsForSelect.filterForOptions
            ? propsForSelect.filterForOptions(options)
            : options).map((x) => {
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
        defaultActiveFirstOption={false}
      />
    </Form.Item>)
  return (
    <Form.Item noStyle shouldUpdate={props.shouldUpdate}>
      {props.shouldUpdate ? subItem : subItem()}
    </Form.Item>
  )
}
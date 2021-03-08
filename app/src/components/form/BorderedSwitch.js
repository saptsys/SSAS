import { Form, Space, Switch } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';

const BorderedSwitch = (props) => {
    return (
        <Form.Item className="form-item-bordered-switch">
            <Space direction="horizontal">
                <Text strong={!(props.checked ?? props?.defaultChecked)} >No</Text>
                <Switch {...props} />
                <Text strong={(props.checked ?? props?.defaultChecked)} >Yes</Text>
            </Space>
        </Form.Item>
    );
};

export default BorderedSwitch;
import { Form, Input, InputNumber, Table } from 'antd';
import React, { useState } from 'react';

const EditableTable = () => {
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    debugger;
    // form.setFieldsValue({
    //   name: '',
    //   age: '',
    //   address: '',
    //   ...record,
    // });
    setEditingKey(record.id);
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    debugger
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex+record.id}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  return (
    <Table
      onRow={(record, index) => ({ onClick: () => edit(record) })}
      columns={[
        {
          title: "Item",
          dataIndex: "itemMasterId",
          editable: true
        }
      ].map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      })}
      dataSource={[{ itemMasterId: 1 }, { itemMasterId: 2 }, { itemMasterId: 3 }]}
      pagination={false}
      bordered
      size="small"
      components={{
        body: {
          cell: EditableCell
        }
      }}
    />
  );
};

export default EditableTable;
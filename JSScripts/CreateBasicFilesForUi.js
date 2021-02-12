const path = require("path");
const glob = require("glob");
const fs = require("fs");

const rootDir = path.resolve(__dirname, "../");

const ormconfig = require(path.join(rootDir, "ormconfig.js"));
const dbFolderDir = path.join(rootDir, ormconfig.folder);

const reduxActionFiles = path.join(rootDir, "./src/_redux/actionFiles");
const mastersFolder = path.join(rootDir, "./src/components/modules/masters");

glob(path.join(dbFolderDir, "entities/*.js"), (er, files) => {
  files.forEach((file) => {
    if (!file.includes("__BaseEntity")) {
      const entitySchema = require(file);
      const entiryName = entitySchema.options.name;

      const reduxPath = path.join(reduxActionFiles, `/${entiryName}Redux.js`);

      const dataToWrite = reducerTemplate(entiryName);
      writeFile(reduxPath, dataToWrite);

      const mastersFolderPath = path.join(
        mastersFolder,
        `/${firstLatterSmall(entiryName)}`
      );
      if (!fs.existsSync(mastersFolderPath)) {
        console.log(
          `====>'${entiryName}'  Masters Folder Not Exists. Creating... <====\n`
        );
        fs.mkdirSync(mastersFolderPath);
      }

      let mastersFormFile = path.join(
        mastersFolderPath,
        `/${entiryName}Form.js`
      );
      writeFile(mastersFormFile, mastersFormTemplate(entiryName));
      let mastersPageFile = path.join(
        mastersFolderPath,
        `/${entiryName}Page.js`
      );
      writeFile(mastersPageFile, mastersPageTemplate(entiryName));

      let mastersTableFile = path.join(
        mastersFolderPath,
        `/${entiryName}Table.js`
      );
      writeFile(mastersTableFile, mastersTableTemplate(entiryName));
    }
  });
});

function writeFile(path, data) {
  if (!fs.existsSync(path)) {
    const dataToWrite = data;
    fs.writeFile(path, dataToWrite, (err) =>
      err ? console.error(err) : console.log(`\n\n====> Created ${path}`)
    );
  } else {
    console.log(`====> Exists '${path}'  <====\n`);
  }
}

function mastersFormTemplate(entiryName) {
  return `
import React from "react";
import { Form, Input, Button, Switch } from "antd";

function ${entiryName}Page({ entityForEdit, saveBtnHandler, saveBtnRef }) {
  const onFinish = (values) => {
    saveBtnHandler && saveBtnHandler({ ...(entityForEdit ?? {}), ...values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed: ", errorInfo);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true, ...(entityForEdit ?? {}) }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      
      <Form.Item hidden>
        <Button type="primary" htmlType="submit" ref={saveBtnRef}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ${entiryName}Page;
`;
}

function mastersPageTemplate(entiryName) {
  return `
import React from 'react'
import ${entiryName}Form from "./${entiryName}Form"
import ${entiryName}Table from "./${entiryName}Table"
import CommonModuleView from "./../../_common/CommonModuleView"
import {${entiryName}Actions , reducerInfo} from "./../../../../_redux/actionFiles/${entiryName}Redux"
function ${entiryName}Page() {
  return (
    <div>
      <CommonModuleView
        EditForm={${entiryName}Form}
        MainTable={${entiryName}Table}
        actions={${entiryName}Actions}
        reducerInfo={reducerInfo}
      />
    </div>
  )
}

export default ${entiryName}Page
  `;
}

function mastersTableTemplate(entiryName) {
  return `
import React from "react";
import CommonTable from "../../_common/CommonTable";

function ${entiryName}Table(props) {
  const columns = [
    
  ];

  return <CommonTable columns={columns} {...props} />;
}

export default ${entiryName}Table;
`;
}

function reducerTemplate(entiryName) {
  return `
import ${entiryName} from "../../../dbManager/models/${entiryName}";
import _BaseIpcActions from "./_BaseIpcActions";
import _BaseSlice from "./_BaseSlice";

export const reducerInfo = {
    name: '${entiryName}',
    model: ${entiryName}
}

export const ${entiryName}Slice = new _BaseSlice(reducerInfo.name)
export const ${entiryName}Actions = new _BaseIpcActions(reducerInfo.name, ${entiryName}Slice)
`;
}

function firstLatterSmall(str) {
  return str.charAt(0).toLowerCase() + str.substr(1, str.length);
}

import { Modal } from 'antd';
import React from 'react';
import { errorDialog } from './Helpers/dialogs';

export default class GlobalErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {    // Display fallback UI
    this.setState({ hasError: true });    // You can also log the error to an error reporting service
    // "Global Error", error.message + '\n\n' + info.componentStack
    Modal.error({ title: "Global Error: " + error.message, content: <>{info.componentStack}</>, width: 720 })
    console.error("GLOBAL ERROR => ", error, info)
  }
  render() {
    return this.props.children;
  }
}

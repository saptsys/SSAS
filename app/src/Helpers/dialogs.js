import { Modal } from "antd";

export function errorDialog(title, content, onCancel, onRetry) {
  Modal.error({
    title: title,
    content: content,
    okCancel: !!onRetry,
    cancelText: "Close",
    okText: onRetry ? 'Retry' : "Close",
    onOk: onRetry,
    onCancel: onCancel,
  })
}

export function successDialog(title, content, onCancel, onRetry) {
  Modal.success({
    title: title,
    content: content,
    okCancel: !!onRetry,
    cancelText: "Close",
    okText: onRetry ? 'Retry' : "Close",
    onOk: onRetry,
    onCancel: onCancel,
  })
}

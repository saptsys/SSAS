import { Modal } from "antd";

export function errorDialog(title, content, onCancel, onRetry) {
    Modal.error({
        title: title,
        content: content,
        okCancel: !!onRetry,
        cancelText: "Close",
        okText: 'Retry',
        onOk: onRetry,
        onCancel: onCancel,
    })
}
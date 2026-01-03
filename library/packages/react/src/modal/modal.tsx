"use client";
import * as React from "react";
import { useState, useEffect } from "react";

export type ModalProps = {
  visible: boolean;
  title?: string;
  closable?: boolean | ((...args: any[]) => any);
  closeNode?: string | any;
  footer?: string | null | any;
  cancelText?: string;
  okText?: string;
  width?: string | number;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  children?: any;
  afterClose?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
};
import Button from "../button/button";

function Modal(props: ModalProps) {
  const [localVisible, setLocalVisible] = useState(() => props.visible);

  function handleClose() {
    setLocalVisible(false);
    props.onCancel?.();
    props.afterClose?.();
  }

  function handleOk() {
    props.onOk?.();
  }

  function handleMaskClick() {
    if (props.maskClosable !== false) {
      handleClose();
    }
  }

  useEffect(() => {
    setLocalVisible(props.visible);
  }, [props.visible]);

  return (
    <>
      {localVisible ? (
        <>
          <div className="div-f55e04a4" onClick={(event) => handleMaskClick()}>
            <div
              className="div-f55e04a4-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="div-f55e04a4-3">
                <div className="div-f55e04a4-4">
                  {props.title || "弹框标题"}
                </div>
                {props.closable !== false ? (
                  <span
                    className="span-f55e04a4"
                    onClick={(event) => handleClose()}
                  >
                    {props.closeNode || "关闭"}
                  </span>
                ) : null}
              </div>
              <div className="div-f55e04a4-5">{props.children}</div>
              {props.footer !== null && props.footer !== undefined ? (
                <div className="div-f55e04a4-6">{props.footer}</div>
              ) : null}
              {props.footer === undefined ? (
                <div className="div-f55e04a4-7">
                  <Button type="default" onClick={(event) => handleClose()}>
                    {props.cancelText || "取消"}
                  </Button>
                  <Button onClick={(event) => handleOk()}>
                    {props.okText || "确定"}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      <style>{`.div-f55e04a4 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}.div-f55e04a4-2 {
  width: 520px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08);
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}.div-f55e04a4-3 {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}.div-f55e04a4-4 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0,0,0,0.85);
}.span-f55e04a4 {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  transition: color 0.2s;
}.span-f55e04a4:hover {
  color: #000;
}.div-f55e04a4-5 {
  padding: 24px;
  overflow: auto;
  flex: 1;
}.div-f55e04a4-6 {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
}.div-f55e04a4-7 {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
}`}</style>
    </>
  );
}

export default Modal;

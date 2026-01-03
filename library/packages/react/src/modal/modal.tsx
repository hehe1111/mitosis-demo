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
          <div className="div-39ca2828" onClick={(event) => handleMaskClick()}>
            <div
              className="div-39ca2828-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="div-39ca2828-3">
                <div className="div-39ca2828-4">
                  {props.title || "弹框标题"}
                </div>
                {props.closable !== false ? (
                  <span
                    className="span-39ca2828"
                    onClick={(event) => handleClose()}
                  >
                    {props.closeNode || "关闭"}
                  </span>
                ) : null}
              </div>
              <div className="div-39ca2828-5">{props.children}</div>
              {props.footer !== null && props.footer !== undefined ? (
                <div className="div-39ca2828-6">{props.footer}</div>
              ) : null}
              {props.footer === undefined ? (
                <div className="div-39ca2828-7">
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
      <style>{`.div-39ca2828 {
  position: fixed;
  background-color: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}.div-39ca2828-2 {
  width: 520px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0,0,0,0.08);
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}.div-39ca2828-3 {
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}.div-39ca2828-4 {
  font-size: 16px;
  color: rgba(0,0,0,0.85);
}.span-39ca2828 {
  cursor: pointer;
  font-size: 16px;
  color: #999;
  transition: color 0.2s;
}.span-39ca2828:hover {
  color: #000;
}.div-39ca2828-5 {
  padding: 24px;
  overflow: auto;
}.div-39ca2828-6 {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}.div-39ca2828-7 {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}`}</style>
    </>
  );
}

export default Modal;

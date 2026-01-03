"use client";
import * as React from "react";

export type ButtonProps = {
  type?: "primary" | "default" | "danger" | "warning";
  onClick?: () => void;
  children: any;
};

export function DefaultButton(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      css={{
        padding: "4px 15px",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "14px",
        height: "32px",
        lineHeight: "32px",
        transition: "all 0.2s",
        backgroundColor: "#fff",
        color: "rgba(0,0,0,0.85)",
        border: "1px solid #d9d9d9",
      }}
    >
      {props.children}
    </button>
  );
}
export function DangerButton(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      css={{
        padding: "4px 15px",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "14px",
        height: "32px",
        lineHeight: "32px",
        transition: "all 0.2s",
        backgroundColor: "#ff4d4f",
        color: "#fff",
        border: "none",
      }}
    >
      {props.children}
    </button>
  );
}
export function WarningButton(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      css={{
        padding: "4px 15px",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "14px",
        height: "32px",
        lineHeight: "32px",
        transition: "all 0.2s",
        backgroundColor: "#faad14",
        color: "#fff",
        border: "none",
      }}
    >
      {props.children}
    </button>
  );
}

function Button(props: ButtonProps) {
  return (
    <>
      {props.type === "primary" || !props.type ? (
        <>
          <button
            className="button-3dab89e8"
            onClick={(event) => props.onClick()}
          >
            {props.children}
          </button>
        </>
      ) : null}
      <style>{`.button-3dab89e8 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #1890ff;
  color: #fff;
  border: none;
}`}</style>
    </>
  );
}

export default Button;

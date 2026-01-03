"use client";
import * as React from "react";

export type ButtonProps = {
  type?: "primary" | "default" | "danger" | "warning";
  onClick?: () => void;
  children: any;
};

function Button(props: ButtonProps) {
  return (
    <>
      <>
        {props.type === "primary" || !props.type ? (
          <button
            className="button-2616d87c"
            onClick={(event) => props.onClick()}
          >
            {props.children}
          </button>
        ) : null}
        {props.type === "default" ? (
          <button
            className="button-2616d87c-2"
            onClick={(event) => props.onClick()}
          >
            {props.children}
          </button>
        ) : null}
        {props.type === "danger" ? (
          <button
            className="button-2616d87c-3"
            onClick={(event) => props.onClick()}
          >
            {props.children}
          </button>
        ) : null}
        {props.type === "warning" ? (
          <button
            className="button-2616d87c-4"
            onClick={(event) => props.onClick()}
          >
            {props.children}
          </button>
        ) : null}
      </>
      <style>{`.button-2616d87c {
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
}.button-2616d87c-2 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #fff;
  color: rgba(0,0,0,0.85);
  border: 1px solid #d9d9d9;
}.button-2616d87c-3 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
}.button-2616d87c-4 {
  padding: 4px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  transition: all 0.2s;
  background-color: #faad14;
  color: #fff;
  border: none;
}`}</style>
    </>
  );
}

export default Button;

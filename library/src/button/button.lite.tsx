import { Show, useStyle } from '@builder.io/mitosis';

export type ButtonProps = {
  type?: 'primary' | 'default' | 'danger' | 'warning';
  onClick?: () => void;
  children: any;
};

export default function Button(props: ButtonProps) {
  useStyle(`
    .button-primary {
      padding: 8px 16px;
      border-radius: 2px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      background-color: #1890ff;
      color: #fff;
      border: none;
    }
    .button-default {
      padding: 8px 16px;
      border-radius: 2px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      background-color: #fff;
      color: rgba(0, 0, 0, 0.85);
      border: 1px solid #d9d9d9;
    }
    .button-danger {
      padding: 8px 16px;
      border-radius: 2px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      background-color: #ff4d4f;
      color: #fff;
      border: none;
    }
    .button-warning {
      padding: 8px 16px;
      border-radius: 2px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      background-color: #faad14;
      color: #fff;
      border: none;
    }
  `);

  return (
    <>
      {/* Primary 类型（默认） */}
      <Show when={props.type === 'primary' || !props.type}>
        <button class="button-primary" onClick={props.onClick}>
          {props.children}
        </button>
      </Show>

      {/* Default 类型 */}
      <Show when={props.type === 'default'}>
        <button class="button-default" onClick={props.onClick}>
          {props.children}
        </button>
      </Show>

      {/* Danger 类型 */}
      <Show when={props.type === 'danger'}>
        <button class="button-danger" onClick={props.onClick}>
          {props.children}
        </button>
      </Show>

      {/* Warning 类型 */}
      <Show when={props.type === 'warning'}>
        <button class="button-warning" onClick={props.onClick}>
          {props.children}
        </button>
      </Show>
    </>
  );
}

import { Show } from '@builder.io/mitosis';

export type ButtonProps = {
  type?: 'primary' | 'default' | 'danger' | 'warning';
  onClick?: () => void;
  children: any;
};

export default function Button(props: ButtonProps) {
  return (
    <>
      {/* Primary 类型（默认） */}
      <Show when={props.type === 'primary' || !props.type}>
        <button
          onClick={props.onClick}
          css={{
            padding: '4px 15px',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            height: '32px',
            lineHeight: '32px',
            transition: 'all 0.2s',
            backgroundColor: '#1890ff',
            color: '#fff',
            border: 'none',
          }}
        >
          {props.children}
        </button>
      </Show>

      {/* Default 类型 */}
      <Show when={props.type === 'default'}>
        <button
          onClick={props.onClick}
          css={{
            padding: '4px 15px',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            height: '32px',
            lineHeight: '32px',
            transition: 'all 0.2s',
            backgroundColor: '#fff',
            color: 'rgba(0,0,0,0.85)',
            border: '1px solid #d9d9d9',
          }}
        >
          {props.children}
        </button>
      </Show>

      {/* Danger 类型 */}
      <Show when={props.type === 'danger'}>
        <button
          onClick={props.onClick}
          css={{
            padding: '4px 15px',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            height: '32px',
            lineHeight: '32px',
            transition: 'all 0.2s',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
          }}
        >
          {props.children}
        </button>
      </Show>

      {/* Warning 类型 */}
      <Show when={props.type === 'warning'}>
        <button
          onClick={props.onClick}
          css={{
            padding: '4px 15px',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            height: '32px',
            lineHeight: '32px',
            transition: 'all 0.2s',
            backgroundColor: '#faad14',
            color: '#fff',
            border: 'none',
          }}
        >
          {props.children}
        </button>
      </Show>
    </>
  );
}

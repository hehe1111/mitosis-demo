import { onUpdate, Show, useStore } from '@builder.io/mitosis';
import Button from '../button/button.lite';

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

export default function Modal(props: ModalProps) {
  const state = useStore({
    localVisible: props.visible,
  });

  onUpdate(() => {
    state.localVisible = props.visible;
  }, [props.visible]);

  function handleClose() {
    state.localVisible = false;
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

  return (
    <Show when={state.localVisible}>
      <div
        css={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={handleMaskClick}
      >
        <div
          css={{
            width: '520px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 6px 16px 0 rgba(0,0,0,0.08)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            css={{
              padding: '16px 24px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <div
              css={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(0,0,0,0.85)',
              }}
            >
              {props.title || '弹框标题'}
            </div>
            <Show when={props.closable !== false}>
              <span
                css={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#999',
                  transition: 'color 0.2s',
                  ':hover': {
                    color: '#000',
                  },
                }}
                onClick={handleClose}
              >
                {props.closeNode || '关闭'}
              </span>
            </Show>
          </div>

          {/* 内容区域 - 直接使用 props.children 避免 useSlots 问题 */}
          <div
            css={{
              padding: '24px',
              overflow: 'auto',
              flex: 1,
            }}
          >
            {props.children}
          </div>

          {/* 自定义 footer */}
          <Show when={props.footer !== null && props.footer !== undefined}>
            <div
              css={{
                padding: '16px 24px',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              {props.footer}
            </div>
          </Show>

          {/* 默认 footer */}
          <Show when={props.footer === undefined}>
            <div
              css={{
                padding: '16px 24px',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                flexShrink: 0,
              }}
            >
              <Button type="default" onClick={handleClose}>
                {props.cancelText || '取消'}
              </Button>
              <Button onClick={handleOk}>
                {props.okText || '确定'}
              </Button>
            </div>
          </Show>
        </div>
      </div>
    </Show>
  );
}

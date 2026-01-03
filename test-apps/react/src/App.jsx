import { useState } from 'react';
import { Button, DefaultButton, DangerButton, WarningButton, Modal } from '@mitosis-demo/library-react';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Button Components</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Button Types</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Button onClick={() => console.log('primary clicked')}>Primary</Button>
          <DefaultButton onClick={() => console.log('default clicked')}>Default</DefaultButton>
          <DangerButton onClick={() => console.log('danger clicked')}>Danger</DangerButton>
          <WarningButton onClick={() => console.log('warning clicked')}>Warning</WarningButton>
        </div>
      </div>

      <div>
        <h2>Modal Component</h2>
        <Button onClick={() => setModalVisible(true)}>Open Modal</Button>

        <Modal
          visible={modalVisible}
          title="Example Modal"
          cancelText="Cancel"
          okText="Confirm"
          onCancel={() => setModalVisible(false)}
          onOk={() => {
            console.log('Confirmed');
            setModalVisible(false);
          }}
        >
          <p>This is the modal content.</p>
          <p>You can put any content here.</p>
        </Modal>
      </div>
    </div>
  );
}

export default App;

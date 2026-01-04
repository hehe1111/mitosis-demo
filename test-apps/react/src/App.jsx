import { useState } from 'react';
import { AutoComplete, Todos, Greet, Button, Modal } from '@mitosis-demo/library-react';
import './App.css';

function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to React.</h1>
      <AutoComplete />
      <Todos />
      <Greet />

      <h2>Button Components</h2>

      <div style={{ marginBottom: '20px' }}>
        <h2>Button Types</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <Button type="primary" onClick={() => console.log('primary clicked')}>Primary</Button>
          <Button onClick={() => console.log('default clicked')}>Default</Button>
          <Button type="danger" onClick={() => console.log('danger clicked')}>Danger</Button>
          <Button type="warning" onClick={() => console.log('warning clicked')}>Warning</Button>
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

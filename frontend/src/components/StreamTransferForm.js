import React, { useState } from 'react';
import axios from 'axios';

function StreamTransferForm({ streamerId }) {
  const [secretCode, setSecretCode] = useState('');
  const [transferMessage, setTransferMessage] = useState('');

  const handleTransferStream = async () => {
    try {
      const response = await axios.post('/api/transfer-stream', { streamerId, secretCode });
      setTransferMessage(response.data.message);
    } catch (error) {
      console.error('Error transferring stream:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Secret Code"
        value={secretCode}
        onChange={(e) => setSecretCode(e.target.value)}
      />
      <button onClick={handleTransferStream}>Transfer Stream</button>
      {transferMessage && <p>{transferMessage}</p>}
    </div>
  );
}

export default StreamTransferForm;

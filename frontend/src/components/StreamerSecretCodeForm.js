// StreamerSecretCodeForm.js

import React, { useState } from 'react';
import axios from 'axios';

function StreamerSecretCodeForm({ streamerId }) {
  const [secretCode, setSecretCode] = useState('');

  const handleGenerateCode = async () => {
    try {
      const response = await axios.post('/api/generate-secret-code', { streamerId });
      setSecretCode(response.data.secretCode);
    } catch (error) {
      console.error('Error generating secret code:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateCode}>Generate Secret Code</button>
      {secretCode && <p>Your secret code is: {secretCode}</p>}
    </div>
  );
}

export default StreamerSecretCodeForm;

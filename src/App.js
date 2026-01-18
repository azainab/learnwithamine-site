import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');

    try {
      // Call FastAPI /chat
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();

      // Add bot response
      setMessages(msgs => [...msgs, { role: 'bot', content: data.response }]);
    } catch (error) {
      setMessages(msgs => [...msgs, { role: 'bot', content: 'Error: ' + error.message }]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Immigration Guide Bot</h1>
        <div style={{ border: '1px solid #ccc', height: '400px', overflowY: 'scroll', padding: '10px', margin: '20px 0' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left', margin: '5px' }}>
              <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about F1, OPT, CPT, Express Entry..."
            style={{ width: '70%', padding: '10px' }}
          />
          <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Send</button>
        </div>
      </header>
    </div>
  );
}

export default App;

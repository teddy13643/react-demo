// src/ChatRoom.js
import React, { useEffect, useState } from 'react';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // Ensure the WebSocket endpoint is correct
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      client.subscribe('//127.0.0.1:8080/public/messages', (msg) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(msg.body)]);
      });
    });

    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && message.trim()) {
      stompClient.send('//127.0.0.1:8080/chat/public/send', {}, JSON.stringify({ content: message }));
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Public Chat Room</h2>
      <div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg.content}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;

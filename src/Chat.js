import React, { useState, useEffect, useRef } from 'react';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        // Create a new WebSocket connection when the component mounts
        ws.current = new WebSocket('ws://localhost:8080/chat');

        ws.current.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.current.onmessage = (event) => {
            // Add received message to the list of messages
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            ws.current.close();
        };
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            ws.current.send(input);
            setInput('');
        }
    };

    return (
        <div>
            <div>
                <h2>Chat</h2>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
            </div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default ChatApp;


'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`);
      setMessages(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleAddMessage = async (messageText) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, {
        text: messageText
      });
      
      setMessages(prev => [...prev, response.data]);
    } catch (err) {
      console.error('Error adding message:', err);
      setError('Failed to add message. Please try again.');
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/${id}`);
      setMessages(prev => prev.filter(message => message._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message. Please try again.');
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Simple Fullstack App</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a New Message</h2>
          <MessageForm onAddMessage={handleAddMessage} />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : messages.length > 0 ? (
            <MessageList messages={messages} onDeleteMessage={handleDeleteMessage} />
          ) : (
            <p className="text-center text-gray-500">No messages yet. Add one above!</p>
          )}
        </div>
      </div>
    </main>
  );
}

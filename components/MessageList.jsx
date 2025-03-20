
'use client';

import { useState } from 'react';

export default function MessageList({ messages, onDeleteMessage }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await onDeleteMessage(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ul className="space-y-3">
      {messages.map((message) => (
        <li 
          key={message._id} 
          className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 flex justify-between items-start"
        >
          <div>
            <p className="text-gray-800">{message.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleDelete(message._id)}
            disabled={deletingId === message._id}
            className="text-red-500 hover:text-red-700 text-sm disabled:opacity-50"
          >
            {deletingId === message._id ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
}

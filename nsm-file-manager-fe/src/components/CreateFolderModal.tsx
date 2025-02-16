import React, { useState } from 'react';
import { Close } from '@mui/icons-material';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string) => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[442px] h-[322px] rounded shadow-lg relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          <Close />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Create Folder</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Folder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Folder Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              onSave(name, description);
              setName('');
              setDescription('');
              onClose();
            }}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] transition-colors text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;

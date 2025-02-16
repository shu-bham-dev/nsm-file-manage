import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { TreeItem } from '../context/FileManagerContext';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: TreeItem | null;
  onSave: (updatedItem: TreeItem) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, itemToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name || '');
      setDescription(itemToEdit.description || '');
    }
  }, [itemToEdit]);

  const handleSave = () => {
    if (itemToEdit) {
      onSave({ ...itemToEdit, name, description });
    }
    onClose();
  };

  return (
    <Modal open={isOpen} closeModal={onClose} showModalCloseBtn={true} className="w-[442px] rounded-2xl">
      <div className="p-4 text-black">
      <div className='border-0 border-b-2 border-gray-100 mb-2'>
        <h2 className="text-lg font-medium mb-4 text-left">Edit Item</h2>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-[#2D336B] text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;

import React from 'react';
import Modal from './Modal';
import { TreeItem } from '../context/FileManagerContext';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToDelete: TreeItem | null;
  onConfirm: (item: TreeItem) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, itemToDelete, onConfirm }) => {
  return (
    <Modal open={isOpen} closeModal={onClose} showModalCloseBtn={true} className="w-[442px] rounded-2xl">
      <div className="p-4 text-black">
      <div className='border-0 border-b-2 border-gray-100 mb-2'>
        <h2 className="text-lg font-medium mb-4 text-left">Delete Item</h2>
        </div>
        <p className="text-center">
          Are you sure you want to delete <span className="font-bold">{itemToDelete?.name}</span>?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (itemToDelete) {
                onConfirm(itemToDelete);
              }
              onClose();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

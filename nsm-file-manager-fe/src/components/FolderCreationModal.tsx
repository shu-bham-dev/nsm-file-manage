import React, { useState } from "react";
import Modal from "./Modal";
import { TreeItem } from "../context/FileManagerContext";

interface FolderCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderCreateItem: TreeItem | null;
  onSave: (name: string, description: string) => void;
}

const FolderCreationModal: React.FC<FolderCreationModalProps> = ({
  isOpen,
  folderCreateItem,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(name, description);
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      closeModal={onClose}
      showModalCloseBtn={true}
      className="w-[442px] rounded-2xl"
    >
      <div className="p-4 text-black">
        <div className="border-0 border-b-2 border-gray-100 mb-2">
          <h2 className="text-lg font-medium mb-4 text-left">Create Folder</h2>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Folder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            placeholder="Folder Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end space-x-2 ">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] transition-colors text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FolderCreationModal;

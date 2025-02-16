import React, { useState } from 'react';
import Modal from './Modal';
import { UploadFile } from '@mui/icons-material';
import { TreeItem } from '../context/FileManagerContext';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  folderUploadItem: TreeItem | null;
  onUpload: (file: File | null, description: string) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, folderUploadItem, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    onUpload(selectedFile, description);
    onClose();
  };

  return (
    <Modal open={isOpen} closeModal={onClose} showModalCloseBtn={true} className="w-[442px] rounded-2xl">
      <div className="p-4 text-black flex flex-col h-full">
        <div className='border-0 border-b-2 border-gray-100 mb-2'>
          <h2 className="text-lg font-medium mb-4 text-left">Upload Document</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p className="mb-4 text-gray-500">Browse Document</p>
          <label className="flex flex-col items-center px-4 py-2 bg-[#5E60CE] text-white rounded cursor-pointer hover:bg-[#4b4cc0]">
            <UploadFile fontSize="small" />
            <span className="mt-2 text-sm">Choose File</span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="mt-4 w-full">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="bg-[#5E60CE] text-white px-4 py-2 rounded hover:bg-[#4b4cc0] transition-colors text-sm"
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FileUploadModal;

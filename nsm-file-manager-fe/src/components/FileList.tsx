import React, { useState } from 'react';
import { Description } from '@mui/icons-material';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import EditIcon from '@mui/icons-material/Edit';                  
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';


export interface TreeItem {
  _id: string;
  name: string;
  type: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: string;
  fileUrl?: string;
  children?: TreeItem[];
}

interface FileListProps {
  items: TreeItem[];
  onSelect: (item: TreeItem) => void;
  selectedFolderId: string | null;
  level?: number;
  onEdit: (item: TreeItem) => void;
  onDelete: (item: TreeItem) => void;
  onCreateFolder: (item: TreeItem) => void;
  onUploadDocument: (item: TreeItem) => void;
}

const formatDateTime = (dt?: string) => {
  if (!dt) return '';
  const parts = dt.split(' ');
  if (parts.length >= 2) {
    return (
      <>
        {parts[0]} <span className="font-bold">{parts[1]}</span>
      </>
    );
  }
  return dt;
};

const FileList: React.FC<FileListProps> = ({
  items,
  onSelect,
  selectedFolderId,
  level = 0,
  onEdit,
  onDelete,
  onCreateFolder,
  onUploadDocument,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [menuOpenRow, setMenuOpenRow] = useState<string | null>(null);

  const handleRowClick = (item: TreeItem) => {
    onSelect(item);
    if (item.children && item.children.length > 0) {
      setExpanded((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
    }
    setMenuOpenRow(null);
  };

  const toggleMenu = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setMenuOpenRow((prev) => (prev === itemId ? null : itemId));
  };
  return (
    <div className="w-full">
      {level === 0 && (
        <div className="grid grid-cols-4 text-black font-bold text-[12px] uppercase p-3">
          <div>Name</div>
          <div>Description</div>
          <div>Created at</div>
          <div>Updated at</div>
        </div>
      )}
        <div className={level === 0 ? "space-y-[15px]" : ""}>
          {items.map((item) => {
          const isExpanded = expanded[item._id] || false;
          const isMenuOpen = menuOpenRow === item._id;
          return (
            <div key={item._id} className={level==0 ? "relative": "border-b border-gray-300 border-opacity-50"} style={{ paddingLeft: level * 16 }}>
              <div
                className={`bg-white ${level === 0 ? "shadow rounded-[5px]": ""} p-3 min-h-[60px] grid grid-cols-4 items-center cursor-pointer ${
                  selectedFolderId === item._id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleRowClick(item)}
              >
                <div className="flex items-center">
                  {item.type==='file' ? (
                    <Description fontSize="large" className="ml-2 text-blue-500" />
                  ) : (
                    <FolderOutlinedIcon fontSize="large" className="ml-2" />
                  )}
                  <span className="ml-2 font-bold">{item.name}</span>
                </div>
                <div>{item.description}</div>
                <div>{formatDateTime(item.createdAt)}</div>
                <div className="flex justify-between items-center relative">
                  <span>{formatDateTime(item.updatedAt)}</span>
                  <button
                    onClick={(e) => toggleMenu(e, item._id)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertOutlinedIcon />
                  </button>
                  {isMenuOpen && (
                    <div
                      className="absolute text-[#444444] right-4 top-[24px] w-[180px] bg-white border border-black rounded-xl shadow-md z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        onClick={() => {
                          onEdit(item);
                          setMenuOpenRow(null);
                        }}
                        className='p-2 flex border-0 border-b-1'
                      >
                        <EditIcon className='ml-2'/>
                        <div className="ml-2 font-bold">Edit</div>
                      </div>
                      <div
                        onClick={() => {
                          onDelete(item);
                          setMenuOpenRow(null);
                        }}
                        className="p-2 flex border-0 border-b-1"
                      >
                        <DeleteIcon className='ml-2'/>
                        <div className="ml-2 font-bold">Delete</div>
                      </div>
                      <div
                        onClick={() => {
                          onCreateFolder(item);
                          setMenuOpenRow(null);
                        }}
                         className="p-2 flex border-0 border-b-1"
                      >
                        <CreateNewFolderOutlinedIcon className='ml-2'/>
                        <div className="ml-2 font-bold">Create Folder</div>
                      </div>
                      <div
                        onClick={() => {
                          onUploadDocument(item);
                          setMenuOpenRow(null);
                        }}
                        className="p-2 flex"
                      ><DriveFolderUploadRoundedIcon className='ml-2'/>
                       <div className="ml-2 font-bold">Upload Document</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isExpanded && item.children && item.children.length > 0 && (
                <div className="bg-white">
                  <FileList
                    items={item.children}
                    onSelect={onSelect}
                    selectedFolderId={selectedFolderId}
                    level={level + 1}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCreateFolder={onCreateFolder}
                    onUploadDocument={onUploadDocument}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileList;

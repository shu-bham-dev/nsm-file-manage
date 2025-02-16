import React, { useState, useRef, useEffect } from 'react';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { Description } from '@mui/icons-material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';

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

interface FolderTreeProps {
  items: TreeItem[];
  onSelect: (item: TreeItem) => void;
  selectedFolderId: string | null;
  selectedPath: string[];
  level?: number;
}

const FolderTree: React.FC<FolderTreeProps> = ({
  items,
  onSelect,
  selectedFolderId,
  selectedPath,
  level = 0,
}) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleClick = (item: TreeItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(item);
    if (item.children && item.children.length > 0) {
      setExpanded((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
    }
  };

  useEffect(() => {
    Object.keys(refs.current).forEach((key) => {
      if (refs.current[key]) {
        refs.current[key]!.style.height = expanded[key] ? `${refs.current[key]!.scrollHeight}px` : '0px';
      }
    });
  }, [expanded]);

  return (
    <div className="overflow-y-auto">
      <ul className="space-y-1">
        {items.map((item) => {
          const isOnSelectedPath = selectedPath.includes(item._id);
          const isExpanded = expanded[item._id] !== undefined
            ? expanded[item._id]
            : isOnSelectedPath;

          return (
            <div key={item._id} style={{ paddingLeft: level * 16 }}>
              <div
                className={`flex items-center p-1.5 cursor-pointer hover:bg-gray-100 border-b border-[#DDDDDD] ${
                  selectedFolderId === item._id ? 'bg-blue-100' : ''
                }`}
                onClick={(e) => handleClick(item, e)}
              >
                {item.type === 'file' ? (
                  <Description className="text-blue-500 ml-6 mr-2" fontSize="small" />
                ) : (
                  <FolderOutlinedIcon className="ml-6 mr-2" fontSize="medium" />
                )}
                <span className="truncate flex-grow">{item.name}</span>
                {isExpanded ? (
                  <RemoveCircleRoundedIcon className="ml-auto mr-2 text-gray-500" />
                ) : (
                  <AddCircleRoundedIcon className="ml-auto mr-2 text-gray-500" />
                )}
              </div>
              <div
                ref={(el) => (refs.current[item._id] = el)}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: isExpanded ? `${refs.current[item._id]?.scrollHeight}px` : '0px' }}
              >
                {item.children && item.children.length > 0 && isExpanded && (
                  <FolderTree
                    items={item.children}
                    onSelect={onSelect}
                    selectedFolderId={selectedFolderId}
                    selectedPath={selectedPath}
                    level={level + 1}
                  />
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FolderTree;

import { createContext, useState, ReactNode } from 'react';

export type TreeItem = {
  _id: string;
  name: string;
  type: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: string;
  fileUrl?: string;
  children?: TreeItem[];
};

interface FileManagerContextProps {
  selectedFolder: TreeItem | null;
  setSelectedFolder: (folder: TreeItem | null) => void;
  treeData: TreeItem[];
  setTreeData: (data: TreeItem[]) => void;
  filterText: string;
  setFilterText: (text: string) => void;
}

export const FileManagerContext = createContext<FileManagerContextProps>({
  selectedFolder: null,
  setSelectedFolder: () => {},
  treeData: [],
  setTreeData: () => {},
  filterText: '',
  setFilterText: () => {},
});

export const FileManagerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFolder, setSelectedFolder] = useState<TreeItem | null>(null);
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const [filterText, setFilterText] = useState('');

  return (
    <FileManagerContext.Provider
      value={{ selectedFolder, setSelectedFolder, treeData, setTreeData, filterText, setFilterText }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};

export default FileManagerProvider;

import React from "react";
import { TreeItem } from "../context/FileManagerContext";

interface BreadcrumbProps {
  path: TreeItem[];
  onNavigate: (folder: TreeItem | null) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, onNavigate }) => {
  return (
    <nav className="flex items-center space-x-2 text-gray-500">
      <span
        className="cursor-pointer hover:underline text-blue-600"
        onClick={() => onNavigate(null)}
      >
        Root
      </span>
      {path.map((folder, index) => (
        <React.Fragment key={folder._id}>
          <span>/</span>
          <span
            className="cursor-pointer hover:underline text-blue-600"
            onClick={() => onNavigate(folder)}
          >
            {folder.name}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;

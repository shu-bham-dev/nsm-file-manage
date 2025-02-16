import React, { useState, useContext, useEffect, useRef } from "react";
import { FileManagerContext, TreeItem } from "../context/FileManagerContext";
import { useApi } from "../api/ApiContext";

import Breadcrumb from "../components/Breadcrumb";
import FilterPanel from "../components/FilterPanel";
import FileUploadModal from "../components/FileUploadModal";
import FolderCreationModal from "../components/FolderCreationModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import FolderTree from "../components/FolderTree";
import FileList from "../components/FileList";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import useModal from "../hooks/useModal";
import PopupMenu from "../components/popupMenu";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import RectangleRoundedIcon from "@mui/icons-material/RectangleRounded";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Popover from "../components/popover";

export const FileManagerPage: React.FC = () => {
  const {
    treeData,
    setTreeData,
    selectedFolder,
    setSelectedFolder,
    filterText,
    setFilterText,
  } = useContext(FileManagerContext);
  const {
    fetchTreeData,
    createFolder,
    updateItem,
    deleteItem,
    uploadDocument,
  } = useApi();

  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const [
    isFolderCreationOpen,
    openFolderCreationModal,
    closeFolderCreationModal,
  ] = useModal();
  const [isFolderUploadOpen, openFolderUpload, closeFolderUpload] = useModal();
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
  const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();
  const [breadcrumbPath, setBreadcrumbPath] = useState<TreeItem[]>([]);

  const [itemToEdit, setItemToEdit] = useState<TreeItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<TreeItem | null>(null);
  const [folderUploadItem, setFolderUploadItem] = useState<TreeItem | null>(
    null
  );
  const [folderCreateItem, setFolderCreateItem] = useState<TreeItem | null>(
    null
  );
  const [treeDataType, setTreeDataType] = useState({
    documentCount: 0,
    folderCount: 0,
  });

  useEffect(() => {
    const countItems = (items: any) => {
      let documentCount = 0;
      let folderCount = 0;

      items.forEach((item: any) => {
        if (item.type === "file") {
          documentCount++;
        } else if (item.type === "folder") {
          folderCount++;
        }

        if (item.children && item.children.length > 0) {
          const childCounts = countItems(item.children);
          documentCount += childCounts.documentCount;
          folderCount += childCounts.folderCount;
        }
      });

      return { documentCount, folderCount };
    };

    const counts = countItems(treeData);
    setTreeDataType(counts);
  }, [treeData]);

  const loadTreeData = async () => {
    try {
      const data = await fetchTreeData();
      setTreeData(data.items || []);
    } catch (err) {
      console.error("Error fetching tree data:", err);
      setTreeData([]);
    }
  };

  useEffect(() => {
    loadTreeData();
  }, []);

  useEffect(() => {
    const evtSource = new EventSource("http://localhost:5000/api/events");
    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("SSE event:", data);
      if (
        data.type === "upload-complete" ||
        data.type === "createFolder" ||
        data.type === "updateItem" ||
        data.type === "deleteItem"
      ) {
        loadTreeData();
      }
    };
    evtSource.onerror = (err) => {
      console.error("SSE error:", err);
      evtSource.close();
    };
    return () => {
      evtSource.close();
    };
  }, []);

  const handleSelectFolder = (item: TreeItem) => {
    if (item.type === "file") return;

    setSelectedFolder(item);

    setBreadcrumbPath((prevPath) => {
      const existingIndex = prevPath.findIndex((p) => p._id === item._id);

      if (existingIndex !== -1) {
        return prevPath.slice(0, existingIndex + 1);
      }

      if (prevPath.length === 0 || prevPath[0].parent === null) {
        return [item];
      }

      return [...prevPath, item];
    });
  };

  const getPath = (items: TreeItem[], selectedId: string | null): string[] => {
    const findPath = (
      items: TreeItem[],
      id: string,
      path: string[]
    ): string[] => {
      for (const item of items) {
        if (item._id === id) return [...path, item.name];
        if (item.children) {
          const childPath = findPath(item.children, id, [...path, item.name]);
          if (childPath.length) return childPath;
        }
      }
      return [];
    };

    return selectedId ? findPath(items, selectedId, []) : [];
  };

  const selectedPath = selectedFolder
    ? getPath(treeData, selectedFolder._id)
    : [];

       const viewRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex h-screen w-screen text-[14px] text-black">
      <div className="bg-[#2D336B] pt-3 px-5">
        <div className="flex flex-col gap-[5px] items-center">
        <RectangleRoundedIcon
            className="text-[#A9B5DF] mb-4 mt-7"
            style={{ width: "50px", height: "50px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <RectangleRoundedIcon
            className="text-[#A9B5DF] opacity-20"
            style={{ width: "40px", height: "40px" }}
          />
          <AccountCircleRoundedIcon className="text-[#A9B5DF] opacity-20 mt-30"
            style={{ width: "60px", height: "60px" }}/>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ${
          leftPanelCollapsed ? "w-0" : "w-[280px]"
        } flex flex-col border border-[#DDDDDD] bg-white`}
      >
        <div className="border border-[#DDDDDD]">
          <div className="ml-5 mt-7 font-semibold text-lg">{`Folders & Documents`}</div>
          <div className="flex flex-row items-start justify-start mt-3 mb-3 py-0 px-[21px]">
            <div className="flex-1 flex">
              <div className="flex-1 flex flex-col items-start justify-start">
                <FolderOutlinedIcon style={{ width: "40px", height: "40px" }} />
                <div className="mt-1.5">Folders</div>
                <div className="text-xl font-semibold mt-1.5">
                  {treeDataType.folderCount}
                </div>
              </div>
              <div className="h-20 flex flex-col pt-2 pb-0 pl-0 pr-7 box-border">
                <div className="flex-1 border border-[#DDDDDD]" />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start">
                <InsertDriveFileOutlinedIcon
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="mt-1.5">Documents</div>
                <div className="text-xl font-semibold mt-1.5">
                  {treeDataType.documentCount}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`absolute cursor-pointer top-7.5 left-22 text-gray-500 ${
              leftPanelCollapsed ? "" : "hidden"
            }`} 
          >
            <ArrowCircleRightIcon
              className="text-gray-500"
              onClick={() => setLeftPanelCollapsed(false)}
            />
          </div>
          <div
            className={`absolute cursor-pointer top-7.5 left-92 bg-gray-50 ${
              leftPanelCollapsed ? "hidden" : ""
            }`}
          >
            <ArrowCircleLeftIcon
              className="text-gray-500"
              onClick={() => setLeftPanelCollapsed(true)}
            />
          </div>
        </div>
        <FolderTree
          items={treeData}
          onSelect={handleSelectFolder}
          selectedFolderId={selectedFolder ? selectedFolder._id : null}
          selectedPath={selectedPath}
        />
      </div>
      {leftPanelCollapsed && (
        <div className="w-6 flex border border-[#DDDDDD] bg-white"></div>
      )}
      <div className="flex-1 flex flex-col bg-[#F8F9FC]">
        <div className="px-6 py-4 bg-white border border-[#DDDDDD] flex items-center justify-between">
          <Breadcrumb
            path={breadcrumbPath}
            onNavigate={(folder) => {
              setSelectedFolder(folder);
              if (!folder) {
                setBreadcrumbPath([]);
              } else {
                const index = breadcrumbPath.findIndex(
                  (p) => p._id === folder._id
                );
                setBreadcrumbPath(breadcrumbPath.slice(0, index + 1));
              }
            }}
          />

          <div className="flex relative items-center">

            <Popover
        triggerNode ={
          <div className="flex items-center justify-center bg-[#2D336B] hover:bg-[#2D336B] w-[35px] h-[35px] rounded-full transition-colors">
           <FilterAltOutlinedIcon className="text-white " />
          </div>
        }
        ref={viewRef}
        >
          <FilterPanel
            filterText={filterText}
            setFilterText={setFilterText}
            onApply={(filters) => {}}
            onCancel={() => setFilterPanelOpen(false)}
            ref = {viewRef}
          />
          </Popover>
            <PopupMenu
              triggerNode={
                <div className="bg-white rounded-full text-black">
                  <button
                    onClick={() => {}}
                    className="flex items-center justify-center bg-[#2D336B] hover:bg-[#2D336B] w-[35px] h-[35px] rounded-full transition-colors"
                  >
                    <AddBoxOutlinedIcon className="text-white" />
                  </button>
                </div>
              }
              className="absolute top-full right-5 mt-2"
              menuItems={[
                {
                  id: 1,
                  label: "Create Folder",
                  onClick: () => {
                    openFolderCreationModal();
                  },
                },
                {
                  id: 2,
                  label: "Upload Folder",
                  onClick: () => openFolderUpload(),
                },
              ]}
            />
          </div>
        </div>
        {/* {filterPanelOpen && (
          <FilterPanel
            filterText={filterText}
            setFilterText={setFilterText}
            onApply={(filters) => {}}
            onCancel={() => setFilterPanelOpen(false)}
          />
        )} */}
        

        
        <div className="flex-1 overflow-y-auto p-6 bg-[#E2ECF8]">
          <FileList
            items={treeData}
            onSelect={(item) => {
              console.log("Selected item:", item);
            }}
            selectedFolderId={null}
            onEdit={(item) => {
              setItemToEdit(item);
              openEditModal();
            }}
            onDelete={(item) => {
              setItemToDelete(item);
              openDeleteModal();
            }}
            onCreateFolder={(item) => {
              setFolderCreateItem(item);
              openFolderCreationModal();
            }}
            onUploadDocument={(item) => {
              setFolderUploadItem(item);
              openFolderUpload();
            }}
          />
        </div>
      </div>
      {isFolderCreationOpen && (
        <FolderCreationModal
          isOpen={isFolderCreationOpen}
          onClose={closeFolderCreationModal}
          folderCreateItem={folderCreateItem}
          onSave={(name, description) => {
            createFolder(name, description, folderCreateItem?._id ?? null);
          }}
        />
      )}
      {isFolderUploadOpen && (
        <FileUploadModal
          isOpen={isFolderUploadOpen}
          folderUploadItem={folderUploadItem}
          onClose={closeFolderUpload}
          onUpload={(file, description) => {
            uploadDocument(file, folderUploadItem?._id ?? null, description);
          }}
        />
      )}
      {isEditModalOpen && itemToEdit && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          itemToEdit={itemToEdit}
          onSave={(updatedItem) => {
            updateItem(updatedItem);
          }}
        />
      )}
      {isDeleteModalOpen && itemToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          itemToDelete={itemToDelete}
          onConfirm={(item) => {
            deleteItem(item._id);
          }}
        />
      )}
    </div>
  );
};

export default FileManagerPage;

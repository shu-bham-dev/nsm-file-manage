import React, { createContext, useContext } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_BE;

console.log(API_BASE,"<<");
export interface ApiContextProps {
  fetchTreeData: () => Promise<any>;
  createFolder: (name: string, description: string, parent: string | null) => Promise<any>;
  updateItem: (item: any) => Promise<any>;
  uploadDocument: (file: File|null, parent: string|null, description: string)=> Promise<any>;
  deleteItem: (itemId: string) => Promise<any>;
}

const ApiContext = createContext<ApiContextProps>({
  fetchTreeData: async () => ({}),
  createFolder: async () => ({}),
  updateItem: async () => ({}),
  deleteItem: async () => ({}),
  uploadDocument: async () => {}
});

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fetchTreeData = async () => {
    const res = await fetch(`${API_BASE}/tree`);
    const data = await res.json();
    return data;
  };

  const createFolder = async (name: string, description: string, parent: string | null) => {
    const payload: { name: string; description: string; parent?: string } = { name, description };
    if (parent) payload.parent = parent;
    const res = await fetch(`${API_BASE}/folder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  };

  const uploadDocument = async (file: File|null, parent: string|null, description: string) => {
    if(file){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    if (parent) {
      formData.append('parent', parent);
    }
  
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      throw new Error(`Failed to upload document: ${res.statusText}`);
    }
  
    return await res.json();
  }
  };
  

  const updateItem = async (item: any) => {
    const res = await fetch(`${API_BASE}/items/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: item.name, description: item.description }),
    });
    return await res.json();
  };

  const deleteItem = async (itemId: string) => {
    const res = await fetch(`${API_BASE}/items/${itemId}`, {
      method: "DELETE",
    });
    return await res.json();
  };

  return (
    <ApiContext.Provider value={{ fetchTreeData, createFolder, updateItem, deleteItem,uploadDocument }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);

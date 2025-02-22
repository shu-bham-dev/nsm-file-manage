# NSM File Manager

A full-stack file management system with a React (Vite) frontend and a Node.js (Express) backend. Supports file uploads using Busboy & Cloudinary.

## 🚀 Project Structure
📂 nsm-file-manager/
├── 📁 nsm-file-manager-fe/   # Frontend (React + Vite)
├── 📁 nsm-file-manager-be/   # Backend (Node.js + Express)


## 🏗️ Setup Instructions

### 🔹 1. Clone the Repository

```sh
git clone https://github.com/your-username/nsm-file-manager.git
cd nsm-file-manager
```


🖥️ Backend Setup (Node.js, Express, Cloudinary)
📌 Navigate to the backend directory:
```
cd nsm-file-manager-be
```
✅ Install Dependencies

npm install

🔧 Configure Environment Variables ( I have added sample in the repo itself for convenience)
```sh
Create a .env file in nsm-file-manager-be/ and add:
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```
▶️ Run the Backend Server
npm run dev

The backend will start on http://localhost:5000
🎨 Frontend Setup (React, Vite, TailwindCSS)
📌 Navigate to the frontend directory:
```
cd ../nsm-file-manager-fe
```

✅ Install Dependencies
```
npm install
```

🔧 Configure Environment Variables
Create a .env file in nsm-file-manager-fe/ and add:

```
VITE_API_BASE_URL=http://localhost:5000
```

▶️ Run the Frontend

```
npm run dev
```
The frontend will start on http://localhost:5173
```
⚡ Tech Stack
🏗️ Backend
Node.js
Express.js
Busboy (for file uploads)
Cloudinary (for cloud storage)
```

```
🎨 Frontend
React.js (Vite)
TailwindCSS
TypeScript
```

## Screenshots
![image](https://github.com/user-attachments/assets/0baad5ec-aa1a-4e8b-8312-f28872983fa6)
![image](https://github.com/user-attachments/assets/d902aa7d-5cd4-4aec-987c-45fec1c48283)![image](https://github.com/user-attachments/assets/941619ac-8391-42a2-a08f-cef39e4a803e)
![image](https://github.com/user-attachments/assets/d5951d07-2788-4566-99b7-128cc53ea084)
![image](https://github.com/user-attachments/assets/38484445-df0f-4664-b6b2-495ac56ede0e)![image](https://github.com/user-attachments/assets/64565a73-3c63-4e97-8fa9-a75ba4f3eb80)


TypeScript
TailwindCSS

✅ Install Dependencies
npm install


import FileManagerPage from './pages/FileManagerPage';
import FileManagerProvider from './context/FileManagerContext';
import { ApiProvider } from './api/ApiContext';


function App() {
  return (
    <FileManagerProvider>
      <ApiProvider>
        <FileManagerPage />
      </ApiProvider>
    </FileManagerProvider>
  );
}

export default App;

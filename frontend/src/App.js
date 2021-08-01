import './App.css';
import { UserContextProvider } from './contexts/userContext';
import { Routes } from './routes';

function App() {
  return (
   <UserContextProvider>
      <Routes />
   </UserContextProvider>
  );
}

export default App;

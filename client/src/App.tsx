import './App.css';
import CarPage from './pages/CarPage';
import { TokenProvider } from './tokens/TokenProvider';

function App() {
  return (
    <>
      <TokenProvider>
        <CarPage />
      </TokenProvider>
    </>
  );
}

export default App;

import CarsList from '../components/CarsList';
import TokenRequestWizard from '../components/TokenRequestWizard';
import { useToken } from '../tokens/useToken';

function CarPage() {
  const { token } = useToken();
  return (
    <div>
      <h1>Cars</h1>
      {!token && <TokenRequestWizard />}
      {!!token && <CarsList />}
    </div>
  );
}

export default CarPage;

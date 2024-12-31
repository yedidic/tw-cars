import { useCallback, useEffect, useMemo, useState } from 'react';

import { CellEditingStoppedEvent, ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Car, CarService } from '../../services/car.service';
import { useToken } from '../../tokens/useToken';

ModuleRegistry.registerModules([AllCommunityModule]);

const CarsList = () => {
  const { token } = useToken();
  const carService = useMemo(() => new CarService(token), [token]);

  const [rowData, setRowData] = useState<Car[]>([]);

  const [colDefs, setColDefs] = useState<ColDef<Car>[]>([
    { field: 'id' },
    { field: 'make', editable: true },
    { field: 'model', editable: true },
    { field: 'year', editable: true },
    { field: 'price', editable: true },
  ]);
  useEffect(() => {
    carService.getAllCars().then((cars) => setRowData(cars));
  }, [carService]);

  const onCellEditingStopped = useCallback(
    async (event: CellEditingStoppedEvent<Car>) => {
      const { data } = event;
      try {
        if (data) {
          await carService.upsertCar(data);
          console.log('Data updated:', data);
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    },
    [carService],
  );

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <div style={{ width: '500px' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        onCellEditingStopped={onCellEditingStopped}
        domLayout="autoHeight"
      />
    </div>
  );
};
export default CarsList;

// src/components/TaxiSimulator.tsx
import React, { useState } from 'react';
import { selectionSort } from '../algorithms/selectionSort';
import { saveRecord, loadRecords } from '../services/firebase';
import { TextField, Button, Typography, Container } from '@mui/material';

type Vehicle = { type: 'bus' | 'car'; capacity: number; };

const VEHICLES: Vehicle[] = [
  { type: 'bus', capacity: 6 },
  { type: 'car', capacity: 4 },
];

export default function TaxiSimulator() {
  const [passengers, setPassengers] = useState(12);
  const [needed, setNeeded] = useState<{ buses: number; cars: number } | null>(null);
  const [records, setRecords] = useState<any[]>([]);

  React.useEffect(() => { loadRecords().then(setRecords); }, []);

  const calculate = async () => {
    // Сортируем по убыванию вместимости
    const sorted = selectionSort(VEHICLES, (a, b) => b.capacity - a.capacity);
    let rem = passengers;
    let buses = 0, cars = 0;

    // Грёди алгоритм: сначала автобусы, потом легковушки
    for (const v of sorted) {
      if (v.type === 'bus') {
        buses = Math.floor(rem / v.capacity);
        rem %= v.capacity;
      } else if (v.type === 'car') {
        cars = Math.ceil(rem / v.capacity);
        rem = 0;
      }
    }

    setNeeded({ buses, cars });
    await saveRecord({ passengers, buses, cars, timestamp: Date.now() });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Taxi Dispatch Simulator</Typography>
      <TextField
        label="Passengers" type="number"
        value={passengers}
        onChange={e => setPassengers(+e.target.value)}
        fullWidth margin="normal"
      />
      <Button variant="contained" onClick={calculate}>Calculate</Button>

      {needed && (
        <Typography mt={2}>
          Нужно <b>{needed.buses}</b> автобус(ов) и <b>{needed.cars}</b> легковых машин.
        </Typography>
      )}

      <Typography variant="h6" mt={4}>History</Typography>
      {records.map((r,i)=>(
        <Typography key={i}>
          {new Date(r.timestamp).toLocaleString()}: {r.passengers} pax → {r.buses} bus, {r.cars} car
        </Typography>
      ))}
    </Container>
  );
}

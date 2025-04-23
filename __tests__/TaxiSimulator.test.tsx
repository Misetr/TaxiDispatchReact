import { render, fireEvent, screen } from '@testing-library/react';
import TaxiSimulator from '../src/components/TaxiSimulator';
test('calculates needed vehicles', async ()=>{
  render(<TaxiSimulator />);
  fireEvent.change(screen.getByLabelText(/Passengers/), { target:{ value: '14' }});
  fireEvent.click(screen.getByText(/Calculate/));
  expect(await screen.findByText(/Need 2 vehicle/)).toBeInTheDocument();
});

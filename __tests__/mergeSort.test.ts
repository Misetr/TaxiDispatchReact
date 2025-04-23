import { mergeSort } from '../src/algorithms/mergeSort';
test('mergeSort orders numbers', ()=>{
  expect(mergeSort([5,2,8,1])).toEqual([1,2,5,8]);
});

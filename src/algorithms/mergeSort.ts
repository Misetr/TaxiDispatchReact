export function mergeSort(arr: number[]): number[] {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }
  function merge(a: number[], b: number[]): number[] {
    const res: number[] = [];
    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) res.push(a[i++]);
      else res.push(b[j++]);
    }
    return res.concat(a.slice(i), b.slice(j));
  }
  
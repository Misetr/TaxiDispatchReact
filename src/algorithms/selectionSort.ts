// src/algorithms/selectionSort.ts
export function selectionSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    const a = [...arr];
    for (let i = 0; i < a.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < a.length; j++) {
        if (compare(a[j], a[minIdx]) < 0) {
          minIdx = j;
        }
      }
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    return a;
  }
  
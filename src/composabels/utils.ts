import axios from "../lib/axios";

let defaultCurrency = 'GHS'
export function anyCurrency(
  v: number | string,
  rate: number = 1,
  currenys: string | null = null
) {
  v = v ? Number(v) : 0
  // v= v/100
  rate = rate ?? 1
  if (v == null) {
    return defaultCurrency+" 0.00";
  }
  v = v + ''
  let n = parseFloat(v) * rate;
  n = n / 100;
  n = parseFloat(n + '');
  if (!currenys) {
    currenys = defaultCurrency;
  }
  if (isNaN(n)) {
    n = 0
  }
  return currenys + ` ${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

export function isDev(): boolean {
  return process.env.NODE_ENV === "development"
}

export const getImageUrl = (name: string) => {
  if (!name) return '';
  if (isDev() && !name.includes('http')) {
    const base = new URL(axios.defaults.baseURL as string).origin
    return base + name
  }
  console.log('img == ',name)
  return name
}


export function   debounce(cb:Function, delay: number) {
  let timeOut: number;
  return (...args: any) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}


export function timeAgo(input: string | Date): string {
  const now = new Date();
  const date = input instanceof Date ? input : new Date(input.replace(" ", "T")); // handle "YYYY-MM-DD HH:mm:ss"

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (isNaN(seconds)) return "Invalid date";

  const intervals: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.345, "week"],
    [12, "month"],
    [Number.MAX_SAFE_INTEGER, "year"], // fallback
  ];

  let unit = "second";
  let value = seconds;

  for (let i = 0; i < intervals.length; i++) {
    if (value < intervals[i][0]) break;
    value = Math.floor(value / intervals[i][0]);
    unit = intervals[i][1];
  }

  return value <= 1
    ? `1 ${unit} ago`
    : `${value} ${unit}s ago`;
}

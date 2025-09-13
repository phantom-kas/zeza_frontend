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


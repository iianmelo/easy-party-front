'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { getProduct, products } from 'data/catalog';
import { roundMoney } from 'lib/format';

export interface CartLine {
  id: string;
  qty: number;
}

interface CommerceValue {
  ready: boolean;
  lines: CartLine[];
  savedIds: string[];
  count: number;
  subtotal: number;
  fee: number;
  total: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clearCart: () => void;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
}

const CART_KEY = 'easyparty.cart';
const SAVED_KEY = 'easyparty.saved';
const FEE_RATE = 0.05;

const CommerceContext = createContext<CommerceValue | null>(null);

function readLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is CartLine =>
          Boolean(line) &&
          typeof line === 'object' &&
          typeof (line as CartLine).id === 'string' &&
          typeof (line as CartLine).qty === 'number'
      )
      .map((line) => ({
        id: line.id,
        qty: Math.max(1, Math.round(line.qty))
      }))
      .filter((line) => products.some((product) => product.id === line.id));
  } catch {
    return [];
  }
}

function readSaved(raw: string | null) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string =>
        typeof id === 'string' && products.some((product) => product.id === id)
    );
  } catch {
    return [];
  }
}

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readLines(localStorage.getItem(CART_KEY)));
    setSavedIds(readSaved(localStorage.getItem(SAVED_KEY)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
  }, [savedIds, ready]);

  const value = useMemo<CommerceValue>(() => {
    const subtotal = roundMoney(
      lines.reduce((sum, line) => {
        const product = getProduct(line.id);
        return sum + (product ? product.price * line.qty : 0);
      }, 0)
    );
    const fee = roundMoney(subtotal * FEE_RATE);
    const count = lines.reduce((sum, line) => sum + line.qty, 0);

    return {
      ready,
      lines,
      savedIds,
      count,
      subtotal,
      fee,
      total: roundMoney(subtotal + fee),
      addToCart: (id, qty = 1) => {
        setLines((current) => {
          const found = current.find((line) => line.id === id);
          if (!found) return [...current, { id, qty: Math.max(1, qty) }];
          return current.map((line) =>
            line.id === id ? { ...line, qty: line.qty + qty } : line
          );
        });
      },
      setQty: (id, qty) => {
        setLines((current) =>
          current.map((line) =>
            line.id === id ? { ...line, qty: Math.max(1, qty) } : line
          )
        );
      },
      remove: (id) => {
        setLines((current) => current.filter((line) => line.id !== id));
      },
      clearCart: () => setLines([]),
      isSaved: (id) => savedIds.includes(id),
      toggleSaved: (id) => {
        setSavedIds((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id]
        );
      }
    };
  }, [lines, ready, savedIds]);

  return (
    <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
  );
}

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value) {
    throw new Error('useCommerce precisa estar dentro de CommerceProvider');
  }
  return value;
}

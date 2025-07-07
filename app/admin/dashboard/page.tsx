'use client';

import { useEffect, useState } from 'react';

interface PriceEntry {
  id: number;
  currency: string;
  amount: number;
}

export default function AdminDashboard() {
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/get-prices')
      .then((res) => res.json())
      .then((data) => setPrices(data))
      .catch((err) => console.error('Veri alınamadı:', err));
  }, []);

  const handleAmountChange = (index: number, newAmount: number) => {
    const updated = [...prices];
    updated[index].amount = newAmount;
    setPrices(updated);
  };

  const handleUpdate = async (price: PriceEntry) => {
    setStatus('Güncelleniyor...');

    try {
      const res = await fetch('/api/update-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: price.id, amount: price.amount }),
      });

      if (res.ok) {
        setStatus(`✔ ${price.currency} güncellendi`);
      } else {
        setStatus(`❌ ${price.currency} güncellenemedi`);
      }
    } catch (err) {
      setStatus('Sunucu hatası.');
    }
  };

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Fiyat Yönetimi</h1>

      {prices.map((price, i) => (
        <div key={price.id} className="flex items-center gap-4">
          <span className="w-20">{price.currency}</span>
          <input
            type="number"
            value={price.amount}
            className="input input-bordered"
            onChange={(e) => handleAmountChange(i, parseFloat(e.target.value))}
          />
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleUpdate(price)}
          >
            Güncelle
          </button>
        </div>
      ))}

      {status && <p className="text-info mt-4">{status}</p>}
    </div>
  );
}

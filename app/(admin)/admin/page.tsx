'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Giriş başarısız!');
    }
  };

  return (
    <>
    <main className="p-10 max-w-md flex flex-col justify-center h-screen mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin Girişi</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full mb-2 focus:border-0"
        />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full mb-4 focus:border-0"
        />
      <button onClick={handleLogin} className="btn btn-primary w-full ">
        Giriş Yap
      </button>
    </main>
      <p className='absolute bottom-5 w-full sm:w-fit p-3 -translate-x-1/2 left-1/2 '>Bu site, oturumunuzu yönetmek için çerez kullanır. Detaylar için çerez politikamıza göz atabilirsiniz.</p>
        </>
  );
}

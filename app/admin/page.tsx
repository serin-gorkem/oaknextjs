"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const login = async () => {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push('/admin/dashboard');
    else alert('Giriş başarısız');
  };

  return (
    <div className="p-10">
      <input type="text" placeholder="Kullanıcı adı" className="input"
        onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Şifre" className="input"
        onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={login} className="btn btn-primary">Giriş Yap</button>
    </div>
  );
}
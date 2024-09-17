'use client';
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  file: File | null;
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    file: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = new FormData();
    
    for (const key in formData) {  //useState의 formData object를 FormData형식으로 생성
      const value = formData[key as keyof FormData];
      if (value !== null) {
        submitData.append(key, value);
      }
    }
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: submitData,
      });
    
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      if (error instanceof Error) {
        setMessage('업로드 중 오류가 발생했습니다: ' + error.message);
      } else {
        setMessage('업로드 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
        />
        <button type="submit">제출</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

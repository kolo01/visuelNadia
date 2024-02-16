// pages/form.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

function FormPage() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  
    e.preventDefault();
    // Traitez ici les données du formulaire (par exemple, effectuez une redirection)
    console.log('Données du formulaire soumises :', formData);
    
const query = queryString.stringify(formData);
router.push(`/test/result?${query}`);
  };

  return (
    <div>
      <h1>Formulaire GET avec Next.js</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Soumettre</button>
        </div>
      </form>
    </div>
  );
}

export default FormPage;

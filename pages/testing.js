import React, { useState } from 'react';
import Head from "next/head";
export default function InputGenerator() {
  const [inputFields, setInputFields] = useState(['']);
  const [selectFields, setSelectFields] = useState(['']);
  const [fileInputsVisible, setFileInputsVisible] = useState([false]); // Tableau pour déterminer la visibilité des champs input type file

  const addInputField = () => {
    setInputFields([...inputFields, '']);
    setSelectFields([...selectFields, '']);
    setFileInputsVisible([...fileInputsVisible, false]); // Ajout d'une entrée avec la visibilité initiale à false
  };

  const toggleFileInputVisibility = (index,value) => {
    if(value=="Option 1"){
        const newFileInputsVisible = [...fileInputsVisible];
        newFileInputsVisible[index] = true;
        setFileInputsVisible(newFileInputsVisible);
    }else{
        const newFileInputsVisible = [...fileInputsVisible];
        newFileInputsVisible[index] = false;
        setFileInputsVisible(newFileInputsVisible);
    }
  
  };

  return (
    <div>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
      {inputFields.map((inputValue, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Input ${index + 1}`}
            value={inputValue}
            onChange={(e) => {
              const newInputFields = [...inputFields];
              newInputFields[index] = e.target.value;
              setInputFields(newInputFields);
            }}
          />
          <select
            value={selectFields[index]}
            onChange={(e) => {
              const newSelectFields = [...selectFields];
              newSelectFields[index] = e.target.value;
              setSelectFields(newSelectFields);
              toggleFileInputVisibility(index,e.target.value);
               // Afficher ou masquer le champ input type file en fonction de la sélection
            }}
          >
            <option value="">Sélectionnez une option</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          {fileInputsVisible[index] && ( // Afficher le champ input type file si la visibilité est true
            <input
              type="file"
              accept="image/*" // Limiter les types de fichiers acceptés aux images
              onChange={(e) => {
                // Gérez ici le traitement du fichier sélectionné (téléchargement, affichage, etc.)
              }}
            />
          )}
        </div>
      ))}

      <button onClick={addInputField}>+</button>
    </div>
  );
}

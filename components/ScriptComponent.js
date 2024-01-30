import React, { useEffect } from 'react';

const ScriptComponent = () => {
  useEffect(() => {
    // Ajoutez votre code JavaScript ici
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl20896093.highcpmrevenuegate.com/04/11/33/04113330b289b1448e794fd5b5779c28.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Nettoyez le script lorsque le composant est démonté
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Contenu de votre composant */}
    </div>
  );
};

export default ScriptComponent;

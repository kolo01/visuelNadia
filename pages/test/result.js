// pages/result.js
import { useRouter } from 'next/router';
import queryString from 'query-string';

function ResultPage() {
  const router = useRouter();
  const { query } = router;
  const formData = queryString.parse(query);
console.log("formdata",formData)
console.log("query",query)
  return (
    <div>
      <h1>Résultats du formulaire GET</h1>
      <p>Nom : {formData.name}</p>
      <p>Email : {formData.email}</p>
    </div>
  );
}

export default ResultPage;

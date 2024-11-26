import { useState } from "react";

export default function Registrar() {

  const [Nome, setNome] = useState([]);
  const [Email, setEmail] = useState([]);

  const Registrar = async (event) => {
event.preventDefault();
try {
  await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome,
      email: email
    })
  });
} catch {
  alert("Ocorreu um erro na aplicação");
}}

  return (
        <>
        <main>
          <form onSubmit={Registrar}>
            <input
            type="text"
            value={Nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target,value)}/>

            <input
            type="text"
            value={Email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target,value)}/>
            <button
            type="submit">Registrar</button>
          </form>
        </main>
        </>
  );
}
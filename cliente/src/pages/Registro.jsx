import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {

  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [descricao, setDescricao] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [colecao, setColecao] = useState('');
  const [avaliacoes, setAvaliacoes] = useState('');

  const navigation = useNavigate();

  const Registrar = async (event) => {
event.preventDefault();
try {
  const resposta = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: nome,
      autor: autor,
      genero: genero,
      descricao: descricao,
      classificacao: classificacao,
      colecao: colecao,
      avaliacoes: avaliacoes,
    })
  });
  if(resposta.ok){
    navigation('/')
  }
} catch (err) {
  alert('Ocorreu um erro na aplicação', err);
}}

  return (
        <>
        <main>
          <form>
            <input
            type="text"
            value={nome}
            placeholder="Nome"
            onChange={(event) => setNome(event.target.value)}/>

            <input
            type="text"
            value={autor}
            placeholder="Autor"
            onChange={(event) => setAutor(event.target.value)}/>

            <input
            type="text"
            value={genero}
            placeholder="Gênero"
            onChange={(event) => setGenero(event.target.value)}/>

            <input
            type="text"
            value={descricao}
            placeholder="Descrição"
            onChange={(event) => setDescricao(event.target.value)}/>

            <input
            type="number"
            value={classificacao}
            placeholder="Classificação Indicativa"
            onChange={(event) => setClassificacao(event.target.value)}/>

            <input
            type="text"
            value={colecao}
            placeholder="Coleção"
            onChange={(event) => setColecao(event.target.value)}/>

            <input
            type="number"
            value={avaliacoes}
            placeholder="Avaliações"
            onChange={(event) => setAvaliacoes(event.target.value)}/>
            <button
            type="submit">Registrar</button>
          </form>
        </main>
        </>
  );
}
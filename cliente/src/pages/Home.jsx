import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from  "@mui/material";
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { Link } from "react-router-dom";
import '../components/globals.css';

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios]);

  const deletar = async(id) => {
    try{
      await fetch('http://localhost:3000/usuarios/'+ id , {
        method: 'DELETE'
      });
    }catch{
      alert("Ish... lascou!")
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();

    const tabela = usuarios.map(usuario => [
      usuario.id,
      usuario.nome,
      usuario.autor,
      usuario.genero,
      usuario.descricao,
      usuario.classificacao,
      usuario.colecao,
      usuario.avaliacoes,
    ]);
    doc.text("Lista de Usuários", 10, 10);

    doc.autoTable({
      head:[["id", "Nome", "Autor", "Gênero", "Descrição", "Classificação Indicativa", "Coleção", "Avaliações"]],
      body: tabela
    })
    doc.save("Arquivo baixado");
  }
  return (
    <div>
      <Button variant="contained" onClick={() => exportarPDF()}><AdfScannerIcon/></Button>
      <Link to={'/registrar'}><button>Registrar</button></Link>
    <table border = '1'>
      <tbody>
      <tr>
        <td>Nome</td>
        <td>Autor</td>
        <td>Gênero</td>
        <td>Descrição</td>
        <td>Classificação Indicativa</td>
        <td>Coleção</td>
        <td>Avaliações</td>
        <th>Ações</th>
      </tr>
      {usuarios.map((usuario) => (
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.autor}</td>
          <td>{usuario.genero}</td>
          <td>{usuario.descricao}</td>
          <td>{usuario.classificacao}</td>
          <td>{usuario.colecao}</td>
          <td>{usuario.avaliacoes}</td>
          <td> <button onClick={()=> deletar(usuario.id)}>Deletar</button></td>
          <Link to={'/alterar/' + usuario.id}>
            <button>Alterar</button>
          </Link>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  );
}
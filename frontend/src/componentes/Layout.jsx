import { Link, useNavigate } from 'react-router-dom'
import { usuarioLogado, sair, ehAdministrador } from '../servicos/auth'

/**
 * Menu do topo + moldura de todas as telas.
 *
 * ====================================================================
 * ESTE E O UNICO ARQUIVO COMPARTILHADO QUE VOCE VAI PRECISAR EDITAR.
 * Voce so adiciona 1 <Link> do seu modulo, na secao da sua frente.
 * NAO mexa nas linhas das outras frentes -> evita conflito de merge.
 * ====================================================================
 */
export default function Layout({ children }) {
  const usuario = usuarioLogado()
  const admin = ehAdministrador()
  const navegar = useNavigate()

  function aoSair() {
    sair()
    navegar('/login')
  }

  return (
    <>
      <header className="cabecalho">
        <span className="marca">BemDoar</span>

        {/* ---------- publico (todo mundo ve) ---------- */}
        <Link to="/">Inicio</Link>
        <Link to="/necessidades">Necessidades</Link>
        <Link to="/campanhas">Campanhas</Link>
        <Link to="/oportunidades">Voluntariado</Link>
        <Link to="/acoes">Acoes sociais</Link>
        <Link to="/comunicados">Comunicados</Link>
        <Link to="/transparencia">Transparencia</Link>

        {/* ---------- area administrativa ---------- */}
        {admin && <Link to="/admin/categorias">Categorias</Link>}
        {admin && <Link to="/admin/necessidades">Gerir necessidades</Link>}
        {admin && <Link to="/admin/doacoes">Gerir doacoes</Link>}
        {admin && <Link to="/admin/campanhas">Gerir campanhas</Link>}
        {admin && <Link to="/admin/oportunidades">Gerir voluntariado</Link>}
        {admin && <Link to="/admin/acoes">Gerir acoes</Link>}
        {admin && <Link to="/admin/comunicados">Gerir comunicados</Link>}
        {usuario && !admin && <Link to="/minhas-doacoes">Minhas doacoes</Link>}
        {usuario && !admin && <Link to="/meu-voluntariado">Meu voluntariado</Link>}
        {usuario && <Link to="/notificacoes">Notificacoes</Link>}

        <span className="direita">
          {usuario ? (
            <>
              <span>{usuario.nome}</span>
              <button className="botao pequeno" onClick={aoSair}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/cadastro">Criar conta</Link>
            </>
          )}
        </span>
      </header>

      <main className="container">{children}</main>
    </>
  )
}

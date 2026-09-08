import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './componentes/Layout'
import RotaProtegida from './componentes/RotaProtegida'

import LoginPage from './paginas/LoginPage'
import CadastroPage from './paginas/CadastroPage'
import HomePage from './paginas/HomePage'

import NecessidadesPublicasPage from './paginas/necessidades/NecessidadesPublicasPage'
import NecessidadeListaPage from './paginas/necessidades/NecessidadeListaPage'
import NecessidadeFormPage from './paginas/necessidades/NecessidadeFormPage'

import CategoriaListaPage from './paginas/categorias/CategoriaListaPage'
import CategoriaFormPage from './paginas/categorias/CategoriaFormPage'
import { ListaModulo, FormModulo, OportunidadeDetalhe, MinhasCandidaturas, MinhasDoacoes, DoacaoForm, Transparencia, Notificacoes, CampanhaNecessidades, CandidatosAdmin, AcaoDetalhe } from './paginas/ModulosPage'

/**
 * ====================================================================
 * MAPA DE ENDERECOS DO SITE.
 *
 * Cada frente adiciona as SUAS rotas na secao marcada com o seu nome.
 * NAO mexa nas rotas das outras frentes -> evita conflito de merge.
 *
 * Como funciona uma linha:
 *   <Route path="/campanhas" element={<CampanhaListaPage />} />
 *          ^ endereco no navegador     ^ componente que aparece
 *
 * Se a tela e so para administrador, embrulhe assim:
 *   element={<RotaProtegida somenteAdmin><MinhaTela /></RotaProtegida>}
 * ====================================================================
 */
export default function App() {
  return (
    <Layout>
      <Routes>

        {/* ---------- publico ---------- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/necessidades" element={<NecessidadesPublicasPage />} />

        {/* ---------- administrativo: categorias (MOLDE) ---------- */}
        <Route path="/admin/categorias"
               element={<RotaProtegida somenteAdmin><CategoriaListaPage /></RotaProtegida>} />
        <Route path="/admin/categorias/nova"
               element={<RotaProtegida somenteAdmin><CategoriaFormPage /></RotaProtegida>} />
        <Route path="/admin/categorias/:id"
               element={<RotaProtegida somenteAdmin><CategoriaFormPage /></RotaProtegida>} />

        {/* ---------- administrativo: necessidades ---------- */}
        <Route path="/admin/necessidades"
               element={<RotaProtegida somenteAdmin><NecessidadeListaPage /></RotaProtegida>} />
        <Route path="/admin/necessidades/nova"
               element={<RotaProtegida somenteAdmin><NecessidadeFormPage /></RotaProtegida>} />
        <Route path="/admin/necessidades/:id"
               element={<RotaProtegida somenteAdmin><NecessidadeFormPage /></RotaProtegida>} />

        {/* ================= FRENTE 1 - DOACOES ================= */}
        <Route path="/doar/necessidade/:id" element={<RotaProtegida><DoacaoForm /></RotaProtegida>} />
        <Route path="/minhas-doacoes" element={<RotaProtegida><MinhasDoacoes /></RotaProtegida>} />
        <Route path="/admin/doacoes" element={<RotaProtegida somenteAdmin><MinhasDoacoes admin /></RotaProtegida>} />
        <Route path="/transparencia" element={<Transparencia />} />

        {/* ================= FRENTE 2 - CAMPANHAS ================= */}
        <Route path="/campanhas" element={<ListaModulo tipo="campanhas" />} />
        <Route path="/comunicados" element={<ListaModulo tipo="comunicados" />} />
        <Route path="/admin/campanhas" element={<RotaProtegida somenteAdmin><ListaModulo tipo="campanhas" admin /></RotaProtegida>} />
        <Route path="/admin/campanhas/nova" element={<RotaProtegida somenteAdmin><FormModulo tipo="campanhas" /></RotaProtegida>} />
        <Route path="/admin/campanhas/:id" element={<RotaProtegida somenteAdmin><FormModulo tipo="campanhas" /></RotaProtegida>} />
        <Route path="/admin/campanhas/:id/necessidades" element={<RotaProtegida somenteAdmin><CampanhaNecessidades /></RotaProtegida>} />
        <Route path="/admin/comunicados" element={<RotaProtegida somenteAdmin><ListaModulo tipo="comunicados" admin /></RotaProtegida>} />
        <Route path="/admin/comunicados/nova" element={<RotaProtegida somenteAdmin><FormModulo tipo="comunicados" /></RotaProtegida>} />
        <Route path="/admin/comunicados/:id" element={<RotaProtegida somenteAdmin><FormModulo tipo="comunicados" /></RotaProtegida>} />

        {/* ================= FRENTE 3 - VOLUNTARIADO ================= */}
        <Route path="/oportunidades" element={<ListaModulo tipo="oportunidades" />} />
        <Route path="/oportunidades/:id" element={<OportunidadeDetalhe />} />
        <Route path="/meu-voluntariado" element={<RotaProtegida><MinhasCandidaturas /></RotaProtegida>} />
        <Route path="/admin/oportunidades" element={<RotaProtegida somenteAdmin><ListaModulo tipo="oportunidades" admin /></RotaProtegida>} />
        <Route path="/admin/oportunidades/nova" element={<RotaProtegida somenteAdmin><FormModulo tipo="oportunidades" /></RotaProtegida>} />
        <Route path="/admin/oportunidades/:id" element={<RotaProtegida somenteAdmin><FormModulo tipo="oportunidades" /></RotaProtegida>} />
        <Route path="/admin/oportunidades/:id/candidatos" element={<RotaProtegida somenteAdmin><CandidatosAdmin /></RotaProtegida>} />

        {/* ================= FRENTE 4 - ACOES SOCIAIS ================= */}
        <Route path="/acoes" element={<ListaModulo tipo="acoes" />} />
        <Route path="/acoes/:id" element={<AcaoDetalhe />} />
        <Route path="/notificacoes" element={<RotaProtegida><Notificacoes /></RotaProtegida>} />
        <Route path="/admin/acoes" element={<RotaProtegida somenteAdmin><ListaModulo tipo="acoes" admin /></RotaProtegida>} />
        <Route path="/admin/acoes/nova" element={<RotaProtegida somenteAdmin><FormModulo tipo="acoes" /></RotaProtegida>} />
        <Route path="/admin/acoes/:id" element={<RotaProtegida somenteAdmin><FormModulo tipo="acoes" /></RotaProtegida>} />
        <Route path="/admin/acoes/:id/resultado" element={<RotaProtegida somenteAdmin><AcaoDetalhe admin /></RotaProtegida>} />

        {/* endereco que nao existe volta para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

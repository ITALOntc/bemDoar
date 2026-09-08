# BemDoar

Sistema de gestao de doacoes, campanhas, voluntariado e acoes sociais.

## Iniciar no Windows

Na raiz do projeto, execute:

```powershell
.\iniciar.ps1
```

O script verifica Java e Node, instala as dependencias do frontend quando necessario, inicia os dois servicos e abre `http://localhost:5173`.

Contas demonstrativas:

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | `admin@bemdoar.com` | `admin123` |
| Usuario | `maria@email.com` | `maria123` |

As credenciais demonstrativas e o console H2 devem ser desabilitados em producao. Consulte [backend/README.md](backend/README.md) e [frontend/README.md](frontend/README.md).

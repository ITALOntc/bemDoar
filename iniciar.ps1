param([switch]$SemAbrirNavegador)

$ErrorActionPreference = 'Stop'
$raizProjeto = $PSScriptRoot
$pastaBackend = Join-Path $raizProjeto 'backend'
$pastaFrontend = Join-Path $raizProjeto 'frontend'

function Testar-Comando($nome, $orientacao) {
    if (-not (Get-Command $nome -ErrorAction SilentlyContinue)) {
        throw "$nome nao foi encontrado. $orientacao"
    }
}

function Porta-Ativa($porta) {
    return [bool](Get-NetTCPConnection -LocalPort $porta -State Listen -ErrorAction SilentlyContinue)
}

Testar-Comando 'java' 'Instale o Java 21 e tente novamente.'
Testar-Comando 'node' 'Instale o Node.js 20.19 ou mais recente e tente novamente.'
Testar-Comando 'npm' 'Instale o npm e tente novamente.'

$versaoNode = (& node --version).TrimStart('v').Split('.')
$nodeCompativel = ([int]$versaoNode[0] -gt 22) -or ([int]$versaoNode[0] -eq 22 -and [int]$versaoNode[1] -ge 12) -or ([int]$versaoNode[0] -eq 20 -and [int]$versaoNode[1] -ge 19)
if (-not $nodeCompativel) { throw 'Use Node.js 20.19+, 22.12+ ou uma versao mais recente.' }

if (-not (Test-Path (Join-Path $pastaFrontend 'node_modules'))) {
    Write-Host 'Instalando dependencias do frontend...'
    & npm install --prefix $pastaFrontend
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao instalar as dependencias do frontend.' }
}

if (Porta-Ativa 8080) { Write-Host 'Backend ja esta ativo na porta 8080.' }
else {
    Write-Host 'Iniciando backend...'
    Start-Process -FilePath (Join-Path $pastaBackend 'mvnw.cmd') -ArgumentList 'spring-boot:run' -WorkingDirectory $pastaBackend -WindowStyle Hidden -RedirectStandardOutput (Join-Path $pastaBackend 'backend.out.log') -RedirectStandardError (Join-Path $pastaBackend 'backend.err.log')
}

if (Porta-Ativa 5173) { Write-Host 'Frontend ja esta ativo na porta 5173.' }
else {
    Write-Host 'Iniciando frontend...'
    Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -WorkingDirectory $pastaFrontend -WindowStyle Hidden -RedirectStandardOutput (Join-Path $pastaFrontend 'frontend.out.log') -RedirectStandardError (Join-Path $pastaFrontend 'frontend.err.log')
}

$limite = (Get-Date).AddSeconds(45)
while ((Get-Date) -lt $limite -and (-not (Porta-Ativa 8080) -or -not (Porta-Ativa 5173))) {
    Start-Sleep -Milliseconds 500
}

if (-not (Porta-Ativa 8080)) { throw 'O backend nao iniciou. Consulte backend/backend.err.log.' }
if (-not (Porta-Ativa 5173)) { throw 'O frontend nao iniciou. Consulte frontend/frontend.err.log.' }

Write-Host 'BemDoar pronto em http://localhost:5173' -ForegroundColor Green
if (-not $SemAbrirNavegador) { Start-Process 'http://localhost:5173' }

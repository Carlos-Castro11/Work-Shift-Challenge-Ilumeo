# ⏱️ Worker Shifts — Desafio Técnico Fullstack | Ilumeo Data Science

Aplicação full stack desenvolvida em 4 dias para o desafio técnico da Ilumeo, com foco em controle de ponto de colaboradores. O sistema permite registrar turnos de trabalho, acompanhar a carga horária diária e consultar o histórico de jornadas anteriores.

🔗 **Acesse a aplicação:**  
https://work-shift-challenge-ilumeo-aqwd.vercel.app/

🔗 **Repositório no GitHub:**  
https://github.com/seu-usuario/worker-shifts

🎨 **Releitura do Figma (obrigatória):**  
https://www.figma.com/design/lMRRaHuKc524lAoiaZT18N/Ilumeo---Teste-Fullstack?node-id=0-1&t=csXAXyjTRUNNGGic-1

---

## 🧪 Login para acesso à aplicação

- **Email:** ilumeo@ilumeo.com  
- **Senha:** 123456

---

## 🛠️ Tecnologias utilizadas

- **Front-end:** React, Vite, TypeScript
- **Back-end:** Node.js, Express, TypeScript
- **Banco de dados:** PostgreSQL com Prisma ORM
- **Infraestrutura:** Docker e Docker Compose

---

## ✅ Requisitos obrigatórios do desafio

- [x] Visualização das horas trabalhadas no dia atual
- [x] Início e fim de turnos
- [x] Histórico de horas trabalhadas nos dias anteriores
- [x] Releitura do protótipo no Figma
- [x] Docker
- [x] S.O.L.I.D.
- [x] Uso de TypeScript
- [x] Testes automatizados
- [x] ESLint e Prettier
- [x] Código limpo e semântico
- [x] Responsividade no front-end
- [x] Conexão com banco de dados via ORM

---

## ✨ Funcionalidades adicionais implementadas

- [x] Login com autenticação JWT (sem refresh)
- [x] Cronômetro com persistência mesmo após logout ou refresh
- [x] Tela de perfil minimalista
- [x] Deploy completo com Docker, Vercel (Front) e Render (Back)
- [x] Organização modular por domínio (DDD leve)

---

## 🐳 Como rodar com Docker

### Pré-requisitos

- Docker instalado
- Git

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/worker-shifts.git
cd worker-shifts

# Construa os containers
docker compose build --no-cache

# Inicie a aplicação
docker compose up
```

📌 A aplicação será exposta nas seguintes portas:

- Front-end: http://localhost:5173
- Back-end: http://localhost:3333

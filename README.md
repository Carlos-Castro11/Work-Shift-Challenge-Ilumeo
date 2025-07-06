# ⏱️ Worker Shifts - Desafio Técnico Ilumeo

Aplicação full stack para controle de ponto. Esta versão roda completamente com **Docker**, sem necessidade de instalar Node.js ou PostgreSQL localmente.

---

## 🐳 Requisitos

- Docker instalado (https://www.docker.com/products/docker-desktop)
- Git (para clonar o repositório)

---

## 🚀 Como rodar com Docker

**1. Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/worker-shifts.git
cd worker-shifts
```

**2. Construa os containers:**

```bash
docker compose build --no-cache
```

**3. Suba a aplicação:**

```bash
docker compose up
```

Isso irá:

- Subir o banco PostgreSQL
- Iniciar o back-end (Node + Prisma)
- Iniciar o front-end (Vite + React)
- Executar as migrations e o seed automaticamente

---

## 🔐 Login de teste

- Email: ilumeo@ilumeo.com  
- Senha: 123456

---

## 🌐 Acessos locais

- Front-end: http://localhost:5173  
- Back-end: http://localhost:3333

---

## 📁 Estrutura do projeto

```
.
├── backend/           → API Express + Prisma + PostgreSQL
├── frontend/          → Aplicação Vite + React
├── docker-compose.yaml
├── README.md
```

---

## ✅ Funcionalidades entregues

- [x] Login com autenticação JWT
- [x] Registro de ponto (início e fim do turno)
- [x] Histórico de turnos
- [x] Página de perfil
- [x] Seed automático com 1 usuário e 50 turnos

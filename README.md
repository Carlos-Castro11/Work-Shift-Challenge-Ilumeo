# ⏱️ Worker Shifts — Desafio Técnico Fullstack | Ilumeo Data Science

Aplicação full stack desenvolvida em 4 dias para o desafio técnico da Ilumeo, com foco em controle de ponto de colaboradores. O sistema permite registrar turnos de trabalho, acompanhar a carga horária diária e consultar o histórico de jornadas anteriores.

🔗 **Acesse a aplicação:**  
https://work-shift-challenge-ilumeo-aqwd.vercel.app/

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

---

## 🌐 Front-end

### 🔧 Tecnologias utilizadas

- **Framework:** React com Vite
- **Linguagem:** TypeScript
- **Roteamento:** React Router DOM
- **Gerenciamento de estado:** Zustand
- **Validação de formulários:** Zod
- **Formulários:** React Hook Form
- **Requisições HTTP:** Axios
- **Gerenciamento de dados assíncronos:** React Query
- **Componentes de UI:** shadcn/ui
- **Ícones:** Lucide React
- **Linting e formatação:** Biome (substituindo ESLint + Prettier por performance e simplicidade)

### 📋 Decisões técnicas

- O **Biome** foi escolhido por oferecer linting e formatação rápidos e com configuração simples, reduzindo tempo de setup e evitando conflitos comuns do ESLint/Prettier.
- A biblioteca **shadcn/ui** foi usada para garantir consistência visual e reutilização de componentes, com boa personalização e suporte a acessibilidade.
- O uso do **Zod + React Hook Form** garante validação de dados forte com esquema tipado, proporcionando maior segurança e previsibilidade nos formulários.
- O **React Query** foi implementado para facilitar o gerenciamento e cache de chamadas assíncronas, evitando re-renderizações desnecessárias.
- **Zustand** foi utilizado para controle global de estado por sua simplicidade, performance e ausência de boilerplate.

Essas decisões garantiram um front-end moderno, performático, escalável e alinhado com as boas práticas esperadas em um desafio técnico profissional.

---

## 🧩 Back-end

### 🧱 Arquitetura

Optei por uma **arquitetura modular inspirada em Domain-Driven Design (DDD)**. Cada domínio da aplicação possui sua própria estrutura organizada em:

- `controller/`: recebe e trata a requisição
- `service/`: contém a lógica de negócio
- `repository/`: realiza o acesso ao banco de dados via ORM

Esse padrão garante:

- Separação clara de responsabilidades
- Testabilidade de cada camada
- Escalabilidade futura
- **Injeção de dependência manual**, onde controllers recebem os services via construtor, e os services recebem os repositórios

---

### 🔧 Tecnologias utilizadas

- **Linguagem:** Node (TypeScript)
- **Biblioteca web:** Express
- **Autenticação:** JWT
- **ORM:** Prisma
- **Banco de dados:** PostgreSQL
- **Linting e formatação:** Biome
- **Testes automatizados:** Vitest
---

### 📋 Decisões técnicas

- A estrutura modular com inspiração em DDD permite isolar contextos e evitar acoplamento excessivo entre camadas.
- O **Prisma** foi escolhido pela excelente integração com TypeScript, produtividade no desenvolvimento e segurança nas queries.
- A autenticação foi feita via **JWT**, com middleware de proteção de rotas e extensão da `Request` com o `userId`.
- O **Biome** foi utilizado também no back-end para garantir consistência de linting e formatação entre as duas partes da aplicação.

Esse conjunto de escolhas proporcionou uma base sólida, segura, testável e aderente aos princípios do S.O.L.I.D., mesmo em um projeto de curto prazo.

# 🏥 MEDCEi - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Interface web do sistema **MEDCEi**, desenvolvida em **React.js** (Create React App). O foco deste frontend é a performance e a usabilidade para os usuários finais.

## 🚀 Tecnologias Utilizadas

* **Core:** React.js (JavaScript)
* **Build Tool:** Create React App (Webpack)
* **Roteamento:** React Router Dom
* **Requisições HTTP:** Axios
* **Estilização:** [CSS Modules / Styled Components / Tailwind]
* **Ícones:** [Lucide Icons / React Icons]

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:
* [Node.js](https://nodejs.org/) (Versão 14 ou superior)
* NPM ou Yarn

## 🔧 Instalação e Configuração

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/seu-usuario/medcei-frontend.git](https://github.com/seu-usuario/medcei-frontend.git)
   cd medcei-frontend
   
2. **Instale as dependências**
    
    npm install
    # ou
    yarn install

3. **Rodando o projeto**
   
    npm run dev
    # ou
    yarn dev


4. 📂 Estrutura do Projeto
  ## A estrutura segue o padrão modular para escalabilidade:
      src/
    ├── assets/          # Imagens, fontes e ícones
    ├── components/      # Componentes reutilizáveis (Botões, Inputs)
    ├── context/         # Context API (Auth, Theme)
    ├── hooks/           # Custom Hooks
    ├── interfaces/      # Tipagens globais do TypeScript (.ts)
    ├── pages/           # Páginas/Rotas da aplicação
    ├── services/        # Configuração do Axios e chamadas à API
    ├── styles/          # Arquivos de estilo globais
    └── App.tsx


🛠️ Scripts Úteis
  npm start: Roda o servidor de desenvolvimento em localhost:3000.
  
  npm run build: Gera a versão otimizada para produção na pasta build.
  
  npm test: Executa os testes unitários.


🤝 Contribuição
  Faça o Fork.
  
  Crie a Branch (git checkout -b feature/NovaFeature).
  
  Commit (git commit -m 'Add: Nova Feature').
  
  Push (git push origin feature/NovaFeature).
  
  Abra um Pull Request.

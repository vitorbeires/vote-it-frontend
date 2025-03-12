# Vote-It Frontend

Frontend React para a rede social Vote-It - Uma plataforma para criar e votar em temas.

## Tecnologias

- React
- TypeScript
- Native Base para UI
- React Query para gerenciamento de estado e requisições
- React Router para navegação
- Axios para comunicação com a API

## Funcionalidades

- Autenticação de usuários (registro e login)
- Visualização de temas
- Criação de novos temas
- Sistema de votação (up/down)
- Sistema de comentários e respostas

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/vitorbeires/vote-it-frontend.git
cd vote-it-frontend

# Instalar dependências
npm install

# Executar em desenvolvimento
npm start

# Compilar para produção
npm run build
```

## Estrutura do Projeto

- `/src/components` - Componentes reutilizáveis
- `/src/contexts` - Contextos React (como AuthContext)
- `/src/pages` - Páginas da aplicação
- `/src/services` - Serviços para comunicação com a API
- `/src/utils` - Funções utilitárias

## Configuração

Para conectar com a API backend, edite o arquivo `src/config.ts` e ajuste a URL da API conforme necessário.
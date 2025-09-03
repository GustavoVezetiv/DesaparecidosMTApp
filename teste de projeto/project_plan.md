# Plano do Projeto - SPA Pessoas Desaparecidas

## 1. Estrutura de Pastas e Arquivos

```
missing-persons-app/
├── src/
│   ├── components/       # Componentes reutilizáveis (CardPessoa, Botao, Input, etc.)
│   ├── pages/            # Páginas da aplicação (Home, DetalhesPessoa)
│   ├── services/         # Funções para consumo da API (api.ts)
│   ├── assets/           # Imagens, ícones, fontes
│   ├── styles/           # Arquivos de estilo globais (Tailwind CSS)
│   ├── main.tsx          # Ponto de entrada da aplicação (para Vite)
│   └── App.tsx           # Componente principal da aplicação
├── public/
│   └── index.html        # Arquivo HTML base
├── Dockerfile            # Configuração para Docker
├── README.md             # Documentação do projeto
├── package.json          # Dependências e scripts do projeto
├── tsconfig.json         # Configuração TypeScript
├── postcss.config.js     # Configuração PostCSS para Tailwind
└── tailwind.config.js    # Configuração Tailwind CSS
```

## 2. Componentes Principais

### `src/App.tsx`
- Componente raiz que configura o roteamento da aplicação.

### `src/pages/HomePage.tsx`
- Exibe a lista de pessoas desaparecidas/localizadas.
- Contém o campo de busca e a paginação.
- Renderiza `CardPessoa` para cada item.

### `src/pages/PersonDetailsPage.tsx`
- Exibe todas as informações detalhadas de uma pessoa.
- Contém o formulário para envio de novas informações.

### `src/components/PersonCard.tsx`
- Componente para exibir um card individual de pessoa.
- Mostra foto, nome, idade e status.
- Destaque visual para status "Desaparecida" ou "Localizada".

### `src/components/SearchInput.tsx`
- Campo de entrada para a funcionalidade de busca.

### `src/components/Pagination.tsx`
- Componente para controlar a paginação da lista de pessoas.

### `src/components/InfoForm.tsx`
- Formulário para o cidadão enviar novas informações sobre a pessoa.
- Inclui campos para observações, localização e upload de fotos.
- Aplica máscaras de entrada.

### `src/components/LoadingSpinner.tsx`
- Indicador visual de carregamento de dados.

### `src/components/ErrorMessage.tsx`
- Componente para exibir mensagens de erro.

## 3. Planejamento de Rotas

Usaremos `react-router-dom` com Lazy Loading.

- `/`: Rota para a `HomePage` (Tela Inicial).
- `/person/:id`: Rota para a `PersonDetailsPage`, onde `:id` é o identificador da pessoa.

## 4. Consumo da API

API: `https://abitus-api.geia.vip/swagger-ui/index.html`

### Endpoints Principais:

- **Listar Pessoas:**
  - Método: `GET`
  - URL: `/api/v1/person`
  - Parâmetros: `page`, `size`, `name`, `status`, etc. (conforme documentação do Swagger)

- **Detalhes da Pessoa:**
  - Método: `GET`
  - URL: `/api/v1/person/{id}`
  - Parâmetros: `{id}` (ID da pessoa)

- **Enviar Informações (Exemplo - a API pode não ter um endpoint direto para isso, será simulado ou adaptado):
  - Método: `POST`
  - URL: `/api/v1/information` (Exemplo de endpoint, pode ser necessário criar um mock ou adaptar a funcionalidade)
  - Corpo da Requisição: `observacoes`, `localizacao`, `fotos`.

### Tratamento de Erros da API:
- Interceptores para erros de rede/servidor.
- Mensagens amigáveis para o usuário em caso de falha na requisição.




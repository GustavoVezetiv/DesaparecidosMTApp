# Sistema de Pessoas Desaparecidas - SPA - EM DESENVOLVIMENTO - (MVP)

Uma Single Page Application (SPA) desenvolvida em React com TypeScript para consulta e envio de informações sobre pessoas desaparecidas, consumindo a API da Polícia Judiciária Civil de Mato Grosso.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como um sistema completo para auxiliar na busca de pessoas desaparecidas, oferecendo uma interface moderna e responsiva para:

- Visualizar lista de pessoas desaparecidas/localizadas
- Buscar pessoas por nome
- Filtrar por status (Desaparecida/Localizada)
- Visualizar detalhes completos de cada pessoa
- Enviar informações e dicas sobre pessoas desaparecidas
- Upload de fotos como evidência

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção da interface
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento com Lazy Loading
- **Axios** - Cliente HTTP para consumo da API
- **Docker** - Containerização da aplicação

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── PersonCard.tsx   # Card de pessoa
│   ├── SearchInput.tsx  # Campo de busca
│   ├── Pagination.tsx   # Componente de paginação
│   ├── InfoForm.tsx     # Formulário de informações
│   ├── LoadingSpinner.tsx # Indicador de carregamento
│   └── ErrorMessage.tsx # Mensagens de erro
├── pages/               # Páginas da aplicação
│   ├── HomePage.tsx     # Página inicial com listagem
│   └── PersonDetailsPage.tsx # Página de detalhes
├── services/            # Serviços e APIs
│   └── api.ts          # Configuração e métodos da API
├── types/               # Definições de tipos TypeScript
│   └── Person.ts       # Tipos relacionados a pessoas
├── hooks/               # Hooks personalizados
│   └── useErrorHandler.ts # Hook para tratamento de erros
├── utils/               # Utilitários
│   └── validation.ts   # Funções de validação
└── App.tsx             # Componente principal com rotas
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker (opcional)

### Instalação Local

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd missing-persons-app
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🐳 Execução com Docker

### Build da Imagem

```bash
docker build -t missing-persons-app .
```

### Executar Container

```bash
docker run -p 8080:80 missing-persons-app
```

A aplicação estará disponível em `http://localhost:8080`

### Docker Compose (Opcional)

Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Execute com:
```bash
docker-compose up -d
```

## 🔧 Configuração da API

A aplicação consome a API pública da Polícia Judiciária Civil de Mato Grosso:

- **Base URL**: `https://abitus-api.geia.vip`
- **Documentação**: [Swagger UI](https://abitus-api.geia.vip/swagger-ui/index.html)

### Endpoints Utilizados

- `GET /api/v1/person` - Lista pessoas com paginação e filtros
- `GET /api/v1/person/{id}` - Detalhes de uma pessoa específica

## 📱 Funcionalidades

### Tela Inicial
- Lista paginada de pessoas desaparecidas/localizadas
- Campo de busca por nome
- Filtro por status
- Cards responsivos com foto, nome, idade e status
- Paginação com navegação intuitiva

### Página de Detalhes
- Informações completas da pessoa
- Foto em tamanho maior
- Status destacado visualmente
- Formulário para envio de informações
- Validação de campos e arquivos

### Formulário de Informações
- Campo de observações (obrigatório)
- Campo de localização
- Telefone de contato com máscara
- Upload múltiplo de fotos
- Validação de tipos e tamanhos de arquivo
- Feedback visual durante envio

## 🎨 Design e UX

- **Responsivo**: Funciona em desktop, tablet e mobile
- **Acessível**: Seguindo boas práticas de acessibilidade
- **Intuitivo**: Interface limpa e fácil navegação
- **Feedback Visual**: Loading states e mensagens de erro claras
- **Performance**: Lazy loading e otimizações

## 🔒 Segurança

- Validação de entrada em todos os formulários
- Sanitização de dados
- Tratamento seguro de uploads
- Headers de segurança no Nginx
- Validação de tipos de arquivo

## 🚨 Tratamento de Erros

- Interceptors do Axios para erros HTTP
- Retry automático para erros de rede
- Mensagens de erro contextuais
- Fallbacks para imagens quebradas
- Estados de loading e erro bem definidos

## 📊 Performance

- Code splitting com React.lazy()
- Otimização de imagens
- Compressão gzip no Nginx
- Cache de arquivos estáticos
- Bundle otimizado com Vite

## 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm run test
```

## 📈 Melhorias Futuras

- Implementação de testes unitários e de integração
- PWA (Progressive Web App) com service workers
- Notificações push para atualizações
- Integração com mapas para localização
- Sistema de autenticação para administradores
- Dashboard administrativo
- API real para envio de informações

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**Contato**: [gustavovezetiv8@gmail.com]
**LinkedIn**: [[seu-linkedin](https://www.linkedin.com/in/gustavo-vezetiv-08416126b/)]

---

## 📞 Suporte

Para dúvidas ou suporte:

- Abra uma issue no GitHub
- Entre em contato via email
- Consulte a documentação da API

---

*Desenvolvido com ❤️ para ajudar na busca de pessoas desaparecidas*

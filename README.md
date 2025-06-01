# Teste Técnico - Desenvolvedor Front-End (TranspNet)

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Front-End na **TranspNet**, conforme instruções fornecidas por **Hosana Nicolli**.

---

## Requisitos Funcionais

A aplicação web consome dados da API pública [DummyJSON](https://dummyjson.com/products) e implementa:

1. **Listagem de produtos** em forma de tabela com:
   - Nome
   - Categoria
   - Preço
   - Estoque
   - Etiquetas (*ver nota abaixo*)
2. **Busca** por nome do produto
3. **Filtro** por categoria
4. **Ordenação** (asc/desc) por nome, estoque ou preço
5. **Paginação** com 10 itens por página
6. **Feedbacks** de carregamento e erro (UX)

> **Nota:** A API [DummyJSON](https://dummyjson.com/products) **não retorna nativamente o campo `tags` (etiquetas)**. Para cumprir os requisitos da prova, o projeto simula ou deixa a coluna preparada, demonstrando a estrutura e possibilidade de expansão.

---

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) com App Router
- [TypeScript](https://www.typescriptlang.org/)
- React Hooks (`useState`, `useEffect`)
- TailwindCSS
- API pública: [DummyJSON](https://dummyjson.com/)

---

## Organização do Projeto

src/
├── app/
│   ├── layout.tsx
│   └── products/
│       ├── page.tsx
│       └── components/
│           ├── Filters.tsx
│           ├── SortSelect.tsx
│           ├── ProductTable.tsx
│           ├── Header.tsx
│           └── Footer.tsx

---

## Como cada arquivo funciona

### `page.tsx`
Componente principal da página de produtos:
- Gerencia **estado global** (produtos, categorias, filtros, ordenação, paginação)
- Usa `useEffect` para buscar dados da API
- Monta a interface com:
  - `<Filters />` (busca e categorias)
  - `<SortSelect />` (ordenador)
  - `<ProductTable />` (tabela)
  - Botões de **paginação** e mensagens de erro

### `Filters.tsx`
- Campo de input para busca (`search`)
- Dropdown de categorias (`category`)
- Recebe props do componente pai (`page.tsx`) e emite mudanças via callbacks

### `SortSelect.tsx`
- Dropdown de ordenação (`asc/desc`) com base no campo (nome, estoque, preço)
- Também emite mudanças via prop `onChange`

### `ProductTable.tsx`
- Renderiza tabela com os produtos recebidos por props
- Mostra **estado de carregamento** e mensagem quando não há produtos
- Organiza colunas: Nome, Categoria, Preço, Estoque

### `product.ts`
- Define interfaces `Product` e `Category`
- Tipagens reutilizadas em todos os componentes com segurança e clareza

---

## Diferenciais Implementados

- Componentes reaproveitáveis e bem separados
- Tratamento de erros com UX amigável
- Suporte a estado de carregamento
- Design responsivo (mobile/desktop)
- Header e footer fixos no mobile
- Download dos requisitos (PDF) no rodapé

---

## Como Rodar Localmente

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/teste-transpnet.git
cd teste-transpnet
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. Acesse: [http://localhost:3000/products](http://localhost:3000/products)

---

## Observações Finais

Este projeto foi desenvolvido com foco em clareza de código, responsividade, e experiência do usuário. A estrutura modular visa facilitar futuras extensões, como filtros adicionais.

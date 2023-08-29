# csv-utility

Api que recebe arquivos csv e salva os registros em banco SQLite. Também faz buscas em todas colunas no banco de acordo com o termo pesquisado.

# Como instalar e executar localmente

- Instalar Node.js
- Executar comando  ```npm install``` na raiz do projeto para instalar dependências
- Executar comando ```npm run dev``` para iniciar a api

# Endpoints
- http://localhost:3000/api/files - Upload de arquivo CSV (de acordo com example.csv)
- http://localhost:3000/api/users - buscar usuários por qualquer coluna da tabela

# Tecnologias
- TypeScript
- Multer
- Jest
- Express.js
- SQLite
- CSV

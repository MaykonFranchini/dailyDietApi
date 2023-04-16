# Setup do projeto

  - Inicialize o projeto node com o comando
    ``` bash
        npm init -y
    ```
    
  - Instale as dependencias relacionadas ao typescript
  ``` bash
      npm i typescript tsx tsup @types/node -D
  ```

  - Instale o fastify e o zod
  ``` bash
      npm i fastify zod dotenv
  ```

  - Crie os scripts de build e start
  ``` js
      "scripts": {
        "start:dev": "tsx watch src/server.ts",
        "start": "node build/server.js",
        "build": "tsup src --out-dir build"
      }
  ```

  - Crie um arquivo com o nome **.npmrc** e insira a seguinte informacao:
  ```js
    save-exact=true
  ```

  - Configure as variaveis ambiente
    * crie um aquivo com o nome **.env**
    * instale o pacote **dotenv**
    * crie uma pasta com o nome **env** e um arquivo **index.ts** dentro da pasta
    * dentro do index.ts insira o codigo abaixo:
      ```js
          import "dotenv"
          import {z} from 'zod'

          const envSchema = z.object({
            NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
            PORT: z.coerce.number().default(3333),

          })

          const _env = envSchema.safeParse(process.env)

          if(_env.success === false) {
            console.error('❌ Invalid enviroment variable', _env.error.format())

            throw new Error('Invalid enviroment variables.')
          }

          export const env = _env.data

      ```
  - Configure o eslint:
    * Instale o pacote do eslint ( npm i eslint @rocketseat/eslint-config -D )
    * crie um arquivo com o nome **.eslintrc.json**
    * dentro do arquivo insira os dados abaixo:
    ```js
        {
          "extends": [
            "@rocketseat/eslint-config/node"
          ]
        }
    ```

    * crie um arquivo *.eslintignore* e insira a pasta node_modules e a pasta build dentro desse arquivo.


  - Faca o setup do prisma e do Docker
    *crie um arquivo docker-compose.yml
    * Insira os dados abaixo alterando as informacoes do seu container, como senha, password, db_name
    ```yml
        version: '3'

        services:
          api-daily-diet-pg:
            image: bitnami/postgresql
            ports:
              - 5432:5432
            environment:
              - POSTGRESQL_USERNAME=docker
              - POSTGRESQL_PASSWORD=docker
              - POSTGRESQL_DATABASE=apidailydiet
    ```
    * suba o contanier com o comando **docker compose up -d**
    * pare o container com o comando **docker compose stop**

    * instale as dependencias do prisma:
      - npm i prisma -D
      -npm i ß @prisma/client
    * inicialize o prisma:
      - npx prisma init
    * insira a url de conexao com o banco no arqivo **.env**
    * rode o comando **npx prisma generate**, assim o prisma gera uma tipagem para os models do banco de dados para facilitar a tipagem no projeto.

    * para rodar migrations use o comando **npx prisma migrate dev**

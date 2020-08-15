![Proffy](./.github/banner-lg.png)

Plataforma para conectar professores e alunos. Desenvolvido durante a Next Level Week #2 com a Rocketseat.

### Screenshots

#### Web

<div style="display: flex; flex-direction: 'row'; align-items: 'center';">
   <div style="display: flex; flex-direction: 'column';">
      <img src="./.github/home.png" width="400">
      <img src="./.github/encontrar-proffy.png" width="400">
   </div>

   <img src="./.github/cadastro-aula.PNG" width="400">
</div>

#### Mobile (Android)

<div style="display: flex; flex-direction: 'row';">
   <img src="./.github/m_home.png" width="180" style="margin-right: '5px'">
   <img src="./.github/m_cadastro_aula.png" width="180" style="margin-right: '5px'">
   <img src="./.github/m_encontrar_proffy_1.png" width="180" style="margin-right: '5px'">
   <img src="./.github/m_encontrar_proffy_2.png" width="180">
</div>

### Como rodar?

Existem 3 módulos:
- **server**: backend do sistema, contruído com [Node.js](https://nodejs.org/);
- **web**: front-end web, construído com [React](https://reactjs.org);
- **mobile**: front-end mobile, contruído com [React Native](https://reactnative.dev/) e [Expo](https://expo.io/);

```shell
git clone https://github.com/FusRoDah061/proffy-nlw.git

# Subindo backend
cd proffy-nlw/server
yarn install
npm run knex:migrate
yarn start

# Acesse a API em http://localhost:3333/

# Subindo front-end web
cd proffy-nlw/web
yarn install
yarn start

# Acesse o front-end em http://localhost:3000/

# Subindo expo para acessar front-end mobile
cd proffy-nlw/mobile
yarn install
yarn start

# Acesse http://localhost:19002/ e leia o QRCode com o app do Expo
```

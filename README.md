## Organizar antes de deixar público

#### Plataforma para juntar alunos e professores

- Construído com abordagem mobile first

### RODAR

- server: yarn install
          npm run knex:migrate
          yarn start
          
- web: yarn install
       yarn start

- mobile: yarn install
          yarn start

## TO-DO

- Na tela "Estudar" mobile, quando um proffy é removido dos favoritos na aba "Favoritos", ele não é atualizado na aba "Proffys". Usar context para monitorar a alteração na aba "Favoritos" e atualizar a aba "Proffys".
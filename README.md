hospedando na vercel
- fazer o build do projeto no vs code:
{
  npm run build
}
- inserir as variaveis de ambiente nas configurações da vercel:
{
  autenticação do google,
  next_aut_secret,
  url do banco de dados
}
- execute o comando no vs code: 
{
  npx prisma migrate deploy
  : este comando gera as tabelas de produção no db
}
- acessar o console do google de autenticação:
{
  atualizar as urls da credencial com a url da vercel
}

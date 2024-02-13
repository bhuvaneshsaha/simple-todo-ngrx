dotnet ef migrations add InitialMigrations -s .\SimpleTodoList.API\ -p .\SimpleTodoList.Infra\ -o Data/Migrations

dotnet ef database update

{
  "email": "test@test.com",
  "password": "$Pass@321"
}
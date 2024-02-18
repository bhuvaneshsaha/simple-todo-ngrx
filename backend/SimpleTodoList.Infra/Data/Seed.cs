using SimpleTodoList.Core.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SimpleTodoList.Infra.Data;

public static class Seed
{
    public static async Task SeedDatabase(TodoDbContext dbContext)
    {
        await dbContext.Database.EnsureCreatedAsync();

        if (dbContext.Todos.Any())
        {
            return;
        }

        var todoData = File.ReadAllText("Data/Seeds/todo-list.json");
        var todos = JsonSerializer.Deserialize<Todo[]>(todoData);

        await dbContext.Todos.AddRangeAsync(todos);

        await dbContext.SaveChangesAsync();
    }
}

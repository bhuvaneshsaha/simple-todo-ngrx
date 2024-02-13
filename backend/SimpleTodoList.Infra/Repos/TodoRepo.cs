using Microsoft.EntityFrameworkCore;
using SimpleTodoList.Core.Interfaces;
using SimpleTodoList.Core.Models.Entities;
using SimpleTodoList.Infra.Data;

namespace SimpleTodoList.Infra.Repos;
public class TodoRepo(TodoDbContext dbContext) : ITodoRepo
{
    public async Task<Todo> CreateTodoAsync(Todo todo)
    {
        var todoEntity = await dbContext.Todos.AddAsync(todo);
        return todoEntity.Entity;
    }

    public async Task DeleteTodoAsync(Guid id)
    {
        await Task.Run(() => dbContext.Todos.Remove(new Todo { Id = id }));
    }

    public async Task<Todo> GetTodoByIdAsync(Guid id)
    {
        return await dbContext.Todos.FindAsync(id);
    }

    public async Task<IEnumerable<Todo>> GetTodosAsync()
    {
        return await dbContext.Todos.AsNoTracking().ToListAsync();
    }

    public async Task<Todo> UpdateTodoAsync(Todo todo)
    {
        var todoEntity = await Task.Run(() => dbContext.Todos.Update(todo));
        return todoEntity.Entity;
    }

    public async Task SaveChangesAsync()
    {
        await dbContext.SaveChangesAsync();
    }
}

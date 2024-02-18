using Microsoft.EntityFrameworkCore;
using SimpleTodoList.Core.Interfaces;
using SimpleTodoList.Core.Models;
using SimpleTodoList.Core.Models.Entities;
using SimpleTodoList.Infra.Data;

namespace SimpleTodoList.Infra.Repos;
public class TodoRepo(TodoDbContext dbContext) : ITodoRepo
{
    public async Task<Todo> CreateTodoAsync(Todo task)
    {
        var todoEntity = await dbContext.Todos.AddAsync(task);
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

    public async Task<PagedList<Todo>> GetTodosAsync(int pageNumber, int pageSize)
    {
        return await PagedList<Todo>.CreateAsync(dbContext.Todos.AsNoTracking(), pageNumber, pageSize);
    }

    public async Task<Todo> UpdateTodoAsync(Todo task)
    {
        var todoEntity = await Task.Run(() => dbContext.Todos.Update(task));
        return todoEntity.Entity;
    }

    public async Task SaveChangesAsync()
    {
        await dbContext.SaveChangesAsync();
    }
}

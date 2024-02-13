
using SimpleTodoList.Core.Models.Dtos;
using SimpleTodoList.Core.Interfaces;
using SimpleTodoList.Core.Models.Entities;
using CommunityToolkit.Diagnostics;
using SimpleTodoList.Core.Models;

namespace SimpleTodoList.App.Services;
public class TodoService(ITodoRepo todoRepo) : ITodoService
{
    public async Task CompleteTodoAsync(Guid id)
    {
        var todo = await todoRepo.GetTodoByIdAsync(id);
        Guard.IsNotNull(todo);

        todo.IsCompleted = true;
        todo.CompletedAt = DateTime.Now;
        await todoRepo.UpdateTodoAsync(todo);
        await todoRepo.SaveChangesAsync();
    }

    public async Task<Todo> CreateTodoAsync(AddOrUpdateTodoDto task)
    {
        var todoToAdd = new Todo
        {
            Title = task.Title,
            Description = task.Description,
            IsCompleted = false,
            CreatedAt = DateTime.Now,
        };
        var createdTodo = await todoRepo.CreateTodoAsync(todoToAdd);
        await todoRepo.SaveChangesAsync();
        return createdTodo;
    }

    public async Task DeleteTodoAsync(Guid id)
    {
        await todoRepo.DeleteTodoAsync(id);
        await todoRepo.SaveChangesAsync();
    }

    public async Task<Todo> GetTodoByIdAsync(Guid id)
    {
        return await todoRepo.GetTodoByIdAsync(id);
    }

    public async Task<PagedList<Todo>> GetTodosAsync(int pageNumber, int pageSize)
    {
        return await todoRepo.GetTodosAsync(pageNumber, pageSize);
    }

    public async Task<Todo> UpdateTodoAsync(Guid id, AddOrUpdateTodoDto task)
    {
        var existingTodo = await todoRepo.GetTodoByIdAsync(id);

        Guard.IsNotNull(existingTodo);

        existingTodo.Title = task.Title;
        existingTodo.Description = task.Description;
        existingTodo.UpdatedAt = DateTime.Now;
        await todoRepo.UpdateTodoAsync(existingTodo);
        await todoRepo.SaveChangesAsync();
        return existingTodo;
    }
}
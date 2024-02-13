
using SimpleTodoList.Core.Models.Dtos;
using SimpleTodoList.Core.Interfaces;
using SimpleTodoList.Core.Entities;

namespace SimpleTodoList.App.Services;
public class TodoService(ITodoRepo todoRepo) : ITodoService
{
    public async Task CompleteTodoAsync(Guid id)
    {
        var todo = await todoRepo.GetTodoByIdAsync(id);
        Guard.NotNull(todo, nameof(todo));

        todo.IsCompleted = true;
        todo.CompletedAt = DateTime.Now;
        await todoRepo.UpdateTodoAsync(todo);
        await todoRepo.SaveChangesAsync();
    }

    public async Task<Todo> CreateTodoAsync(AddTodoDto todo)
    {
        var todoToAdd = new Todo
        {
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = todo.IsCompleted,
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

    public async Task<IEnumerable<Todo>> GetTodosAsync()
    {
        return await todoRepo.GetTodosAsync();
    }

    public async Task<Todo> UpdateTodoAsync(Guid id, UpdateTodoDto todo)
    {
        var existingTodo = await todoRepo.GetTodoByIdAsync(id);

        Guard.NotNull(existingTodo, nameof(existingTodo));

        existingTodo.Title = todo.Title;
        existingTodo.Description = todo.Description;
        existingTodo.IsCompleted = todo.IsCompleted;
        existingTodo.UpdatedAt = DateTime.Now;
        await todoRepo.UpdateTodoAsync(existingTodo);
        await todoRepo.SaveChangesAsync();
        return existingTodo;
    }
}
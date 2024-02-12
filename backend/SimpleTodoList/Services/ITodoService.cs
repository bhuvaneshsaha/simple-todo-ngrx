
using SimpleTodoList.Models.Dtos;
using SimpleTodoList.Models.Entities;

namespace SimpleTodoList.Services;

public interface ITodoService
{
    Task<IEnumerable<Todo>> GetTodosAsync();
    Task<Todo> GetTodoByIdAsync(Guid id);
    Task<Todo> CreateTodoAsync(AddTodoDto todo);
    Task<Todo> UpdateTodoAsync(Guid id, UpdateTodoDto todo);
    Task DeleteTodoAsync(Guid id);
    Task CompleteTodoAsync(Guid id);
}
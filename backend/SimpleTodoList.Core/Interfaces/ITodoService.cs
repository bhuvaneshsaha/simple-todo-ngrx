
using SimpleTodoList.Core.Models.Dtos;
using SimpleTodoList.Core.Models.Entities;

namespace SimpleTodoList.Core.Interfaces;

public interface ITodoService
{
    /// <summary>
    /// Get all tasks from the database
    /// </summary>
    /// <returns></returns>
    Task<IEnumerable<Todo>> GetTodosAsync();

    /// <summary>
    /// Get a task by its id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<Todo> GetTodoByIdAsync(Guid id);

    /// <summary>
    /// Create a new task
    /// </summary>
    /// <param name="task"></param>
    /// <returns></returns>
    Task<Todo> CreateTodoAsync(AddOrUpdateTodoDto task);

    /// <summary>
    /// Update an existing task
    /// </summary>
    /// <param name="id"></param>
    /// <param name="task"></param>
    /// <returns></returns>
    Task<Todo> UpdateTodoAsync(Guid id, AddOrUpdateTodoDto task);

    /// <summary>
    /// Delete a task by its id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task DeleteTodoAsync(Guid id);

    /// <summary>
    /// Complete a task by its id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task CompleteTodoAsync(Guid id);
}
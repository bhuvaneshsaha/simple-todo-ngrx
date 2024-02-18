using SimpleTodoList.Core.Models;
using SimpleTodoList.Core.Models.Entities;

namespace SimpleTodoList.Core.Interfaces;
public interface ITodoRepo
{
    /// <summary>
    /// Get all todos from the database
    /// </summary>
    /// <returns></returns>
    Task<PagedList<Todo>> GetTodosAsync(int pageNumber, int pageSize);

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
    Task<Todo> CreateTodoAsync(Todo task);

    /// <summary>
    /// Update an existing task
    /// </summary>
    /// <param name="task"></param>
    /// <returns></returns>
    Task<Todo> UpdateTodoAsync(Todo task);

    /// <summary>
    /// Delete a task by its id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task DeleteTodoAsync(Guid id);

    /// <summary>
    /// Save changes to the database
    /// </summary>
    /// <returns></returns>
    Task SaveChangesAsync();
}
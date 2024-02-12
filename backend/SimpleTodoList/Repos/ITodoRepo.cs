
namespace SimpleTodoList.Repos;
public interface ITodoRepo
{
    Task<IEnumerable<Todo>> GetTodosAsync();
    Task<Todo> GetTodoByIdAsync(Guid id);
    Task<Todo> CreateTodoAsync(Todo todo);
    Task<Todo> UpdateTodoAsync(Todo todo);
    Task DeleteTodoAsync(Guid id);
    Task SaveChangesAsync();
}
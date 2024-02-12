
using SimpleTodoList.Models.Dtos;
using SimpleTodoList.Services;

namespace SimpleTodoList.Controllers;

public class TodoController(ITodoService todoService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetTodos()
    {
        var todos = await todoService.GetTodosAsync();
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTodoById(Guid id)
    {
        var todo = await todoService.GetTodoByIdAsync(id);
        return Ok(todo);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo([FromBody] AddTodoDto todo)
    {
        var createdTodo = await todoService.CreateTodoAsync(todo);
        return CreatedAtAction(nameof(GetTodoById), new { id = createdTodo.Id }, createdTodo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(Guid id, [FromBody] UpdateTodoDto todo)
    {
        var updatedTodo = await todoService.UpdateTodoAsync(id, todo);
        return Ok(updatedTodo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(Guid id)
    {
        await todoService.DeleteTodoAsync(id);
        return NoContent();
    }

    [HttpPatch("{id}/complete")]
    public async Task<IActionResult> CompleteTodo(Guid id)
    {
        await todoService.CompleteTodoAsync(id);
        return NoContent();
    }

}

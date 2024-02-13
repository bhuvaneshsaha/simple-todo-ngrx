using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleTodoList.API.Helpers.Extensions;
using SimpleTodoList.Core.Interfaces;
using SimpleTodoList.Core.Models;
using SimpleTodoList.Core.Models.Dtos;

namespace SimpleTodoList.API.Controllers;

[Authorize]
public class TodoController(ITodoService todoService) : BaseController
{
    [HttpGet]
    public async Task<IActionResult> GetTodos([FromQuery]UserParams userParams)
    {
        var todos = await todoService.GetTodosAsync(userParams.PageNumber, userParams.PageSize);
        Response.AddPaginationInHeader(todos.CurrentPage, todos.TotalPages, todos.PageSize, todos.TotalCount);
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTodoById(Guid id)
    {
        var todo = await todoService.GetTodoByIdAsync(id);
        return Ok(todo);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo([FromBody] AddOrUpdateTodoDto todo)
    {
        var createdTodo = await todoService.CreateTodoAsync(todo);
        return CreatedAtAction(nameof(GetTodoById), new { id = createdTodo.Id }, createdTodo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(Guid id, [FromBody] AddOrUpdateTodoDto todo)
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


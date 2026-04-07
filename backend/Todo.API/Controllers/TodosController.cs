using Microsoft.AspNetCore.Mvc;
using Todo.Application.Dtos;
using Todo.Application.Services;

namespace Todo.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TodoItemDto>>> GetAll()
    {
        var todos = await _todoService.GetAllTodosAsync();
        return Ok(todos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItemDto>> GetById(Guid id)
    {
        var item = await _todoService.GetTodoByIdAsync(id);
        if (item is null) 
            return NotFound();

        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateTodoRequest request)
    {
        var id = await _todoService.CreateTodosAsync(request);
        return CreatedAtAction(nameof(GetById), new { id }, id);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateTodoRequest request)
    {
        await _todoService.UpdateTodoAsync(id, request);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _todoService.DeleteTodoAsync(id);
        return NoContent();
    }
}
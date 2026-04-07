using Todo.Application.Dtos;

namespace Todo.Application.Services;

public interface ITodoService
{
    Task<IReadOnlyList<TodoItemDto>> GetAllTodosAsync();
    Task<TodoItemDto?> GetTodoByIdAsync(Guid id);
    Task<Guid> CreateTodosAsync(CreateTodoRequest request);
    Task UpdateTodoAsync(Guid id, UpdateTodoRequest request);
    Task DeleteTodoAsync(Guid id);
}
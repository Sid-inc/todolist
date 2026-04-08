namespace Todo.Application.Dtos;

public record UpdateTodoRequest(string? Title, string? Description, bool? IsCompleted);
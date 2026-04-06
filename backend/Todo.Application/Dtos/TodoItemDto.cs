namespace Todo.Application.Dtos;

public record TodoItemDto(Guid Id, string Title, string? Description, bool IsCompleted, DateTime CreatedAt, DateTime? UpdatedAt);
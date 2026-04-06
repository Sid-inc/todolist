using Todo.Application.Dtos;
using Todo.Domain.Models;

namespace Todo.Application.Extensions;

public static class TodoItemExtensions
{
    public static TodoItemDto ToDto(this TodoItem item)
    {
        return new TodoItemDto(item.Id, item.Title, item.Description, item.IsCompleted, item.CreatedAt, item.UpdatedAt);
    }
    
    public static TodoItem ToEntity(this CreateTodoRequest request)
    {
        return new TodoItem(request.Title, request.Description);
    }
    
    public static void Update(this TodoItem item, UpdateTodoRequest request)
    {
        item.Update(request.Title, request.Description);
        
        if (request.IsCompleted != item.IsCompleted)
            item.ToggleCompleted();
    }
}
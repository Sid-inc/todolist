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
        if (request.Title is not null) 
            item.UpdateTitle(request.Title);
        
        if (request.Description is not null) 
            item.UpdateDescription(request.Description);
        
        if (request.IsCompleted.HasValue && request.IsCompleted != item.IsCompleted)
            item.ToggleCompleted();
    }
}
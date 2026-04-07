using Todo.Application.Dtos;
using Todo.Application.Extensions;
using Todo.Domain.Repositories;
using InvalidOperationException = System.InvalidOperationException;

namespace Todo.Application.Services;

public class TodoService : ITodoService
{
    readonly ITodoRepository _repository;
    
    public TodoService(ITodoRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<IReadOnlyList<TodoItemDto>> GetAllTodosAsync()
    {
        var items = await _repository.GetAllAsync();
        return items.Select(x => x.ToDto()).ToList();
    }

    public async Task<TodoItemDto?> GetTodoByIdAsync(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        return item?.ToDto();
    }

    public async Task<Guid> CreateTodosAsync(CreateTodoRequest request)
    {
        var item = request.ToEntity();
        
        await _repository.AddAsync(item);
        await _repository.SaveChangesAsync();
        
        return item.Id;
    }

    public async Task UpdateTodoAsync(Guid id, UpdateTodoRequest request)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item is null)
            throw new InvalidOperationException("Item not found");
        
        item.Update(request);
        
        await _repository.UpdateAsync(item);
        await _repository.SaveChangesAsync();
    }

    public async Task DeleteTodoAsync(Guid id)
    {
        var item = await _repository.GetByIdAsync(id);
        if (item is null)
            throw new InvalidOperationException("Item not found");
        
        await _repository.DeleteAsync(item.Id);
        await _repository.SaveChangesAsync();
    }
}
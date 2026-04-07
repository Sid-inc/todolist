using Microsoft.EntityFrameworkCore;
using Todo.Domain.Models;
using Todo.Domain.Repositories;
using Todo.Infrastructure.Data;

namespace Todo.Infrastructure.Repositories;

public class TodoRepository : ITodoRepository
{
    readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<TodoItem?> GetByIdAsync(Guid id)
    {
        return await _context.TodoItems.FindAsync(id);
    }

    public async Task<IReadOnlyList<TodoItem>> GetAllAsync()
    {
        return await _context.TodoItems.ToListAsync();
    }

    public async Task AddAsync(TodoItem item)
    {
        await _context.TodoItems.AddAsync(item);
    }

    public Task UpdateAsync(TodoItem item)
    {
        _context.TodoItems.Update(item);
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(Guid id)
    {
        var item = await GetByIdAsync(id);
        if (item is not null)
            _context.TodoItems.Remove(item);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
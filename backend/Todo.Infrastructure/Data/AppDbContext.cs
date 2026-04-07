using Microsoft.EntityFrameworkCore;
using Todo.Domain.Models;

namespace Todo.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<TodoItem> TodoItems { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TodoItem>(x =>
        {
            x.HasKey(e => e.Id);
            x.Property(e => e.Title).IsRequired().HasMaxLength(TodoItem.TitleMaxLength);
            x.Property(e => e.Description).HasMaxLength(TodoItem.DescriptionMaxLength);
            x.Property(e => e.CreatedAt).IsRequired();
            x.Property(e => e.UpdatedAt).IsRequired(false);
            x.HasIndex(e => e.IsCompleted);
        });
    }
}
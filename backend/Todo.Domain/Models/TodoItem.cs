namespace Todo.Domain.Models;

public class TodoItem
{
    public Guid Id { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public bool IsCompleted { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }

    public const int TitleMaxLength = 120;
    public const int DescriptionMaxLength = 2000;

    public TodoItem(string title, string? description = null)
    {
        Id = Guid.NewGuid();
        CreatedAt = DateTime.UtcNow;
        
        SetTitle(title);
        SetDescription(description);
    }

    public void UpdateTitle(string title)
    {
        SetTitle(title);
        UpdatedAt = DateTime.UtcNow;
    }
    
    public void UpdateDescription(string title)
    {
        SetDescription(title);
        UpdatedAt = DateTime.UtcNow;
    }

    public void ToggleCompleted()
    {
        IsCompleted = !IsCompleted;
        UpdatedAt = DateTime.UtcNow;
    }
    
    void SetTitle(string title)
    {
        if(string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Empty title", nameof(title));
        
        if(title.Length > TitleMaxLength)
            throw new ArgumentException("Too long title", nameof(title));
        
        Title = title;
    }
    
    void SetDescription(string? description)
    {
        if(description is not null && description.Length > DescriptionMaxLength)
            throw new ArgumentException("Too long description", nameof(description));
        
        Description = description;
    }
    
}
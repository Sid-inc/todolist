using Microsoft.Extensions.DependencyInjection;
using Todo.Application.Services;

namespace Todo.Application.Extensions;

public static class TodosServiceInjection
{
    public static IServiceCollection AddTodosService(this IServiceCollection services)
    {
        services.AddScoped<ITodoService, TodoService>();
        return services;
    }
}
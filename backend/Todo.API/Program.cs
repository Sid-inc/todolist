using Todo.Application.Extensions;
using Todo.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTodosService();
builder.Services.AddDbContext(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("AllowAngular", policy => policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/error");
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors();

app.Run();
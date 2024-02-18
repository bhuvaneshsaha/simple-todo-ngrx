using SimpleTodoList.API.Helpers.Extensions;
using SimpleTodoList.Core.Models.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// add delay response for testing
app.Use(async (context, next) =>
{
    await Task.Delay(1000);
    await next();
});

app.MapGroup("api").MapIdentityApi<AppUser>();

app.Run();

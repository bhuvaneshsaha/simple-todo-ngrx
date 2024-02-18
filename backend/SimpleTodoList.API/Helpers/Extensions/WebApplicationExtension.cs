using Microsoft.EntityFrameworkCore;
using SimpleTodoList.Infra.Data;

namespace SimpleTodoList.API.Helpers.Extensions;

public static class WebApplicationExtension
{
    public static async Task SeedDatabase(this WebApplication app)
    {
        var scope = app.Services.CreateScope();
        var serviceProvider = scope.ServiceProvider;
        var dbContext = serviceProvider.GetRequiredService<TodoDbContext>();

        await dbContext.Database.MigrateAsync();

        await Seed.SeedDatabase(dbContext);
    }
}

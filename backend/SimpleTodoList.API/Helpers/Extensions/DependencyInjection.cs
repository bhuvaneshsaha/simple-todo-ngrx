using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SimpleTodoList.App.Services;
using SimpleTodoList.Core.Interfaces;
using SimpleTodoList.Core.Models.Entities;
using SimpleTodoList.Infra.Data;
using SimpleTodoList.Infra.Repos;

namespace SimpleTodoList.API.Helpers.Extensions;

public static class DependencyInjection
{
    public static void AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<TodoDbContext>(options =>
        {
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddIdentityCore<AppUser>()
            .AddEntityFrameworkStores<TodoDbContext>()
            .AddApiEndpoints();

        services.AddAuthentication()
            .AddBearerToken(IdentityConstants.BearerScheme);

        services.AddAuthorizationBuilder();
    

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", config =>
            {
                config.AllowAnyOrigin();
                config.AllowAnyMethod();
                config.AllowAnyHeader();
            });
        });

        services.AddScoped<ITodoRepo, TodoRepo>();
        services.AddScoped<ITodoService, TodoService>();
    }
}

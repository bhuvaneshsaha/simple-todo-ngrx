using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SimpleTodoList.Core.Models.Entities;


namespace SimpleTodoList.Infra.Data;

public class TodoDbContext(DbContextOptions<TodoDbContext> options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Todo> Todos { get; set; }
}

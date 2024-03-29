﻿using Microsoft.EntityFrameworkCore;

namespace SimpleTodoList.Core.Models;

public class PagedList<T> : List<T>
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        this.AddRange(items);
    }

    public static async Task<PagedList<T>> CreateAsync(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync();
        var countToSkip = (pageNumber - 1) * pageSize;
        var items = await query.Skip(countToSkip).Take(pageSize).ToListAsync();
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}

using System.Text.Json;

namespace SimpleTodoList.API.Helpers.Extensions;

public static class HttpResponseExtension
{
    public static void AddPaginationInHeader(this HttpResponse response,
        int currentPage, int totalPages, int pageSize, int totalCount)
    {
        var paginationHeader = new PaginationHeader(currentPage, totalPages, pageSize, totalCount);
        response.Headers.Append("X-Pagination", JsonSerializer.Serialize(paginationHeader));

    }
}

public record PaginationHeader(int CurrentPage, int TotalPages, int PageSize, int TotalCount);
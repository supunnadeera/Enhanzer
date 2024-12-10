using Microsoft.EntityFrameworkCore;
using BookManagement.API.Models;

namespace BookManagement.API.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; } = null!;
    }
}
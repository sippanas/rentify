using Microsoft.EntityFrameworkCore;
using Rentify.Data.Models;

namespace Rentify.Data
{
    public class DatabaseContext : DbContext
    {
        public DbSet<ObjectType> ObjectTypes { get; set; }
        public DbSet<Models.Object> Objects { get; set; }

        public DbSet<Room> Rooms { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var connectionString = "server=localhost;user=root;password=;database=rentify";
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }
}

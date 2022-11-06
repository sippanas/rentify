using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Rentify.Auth.Models;
using Rentify.Data.Models;

namespace Rentify.Data
{
    public class DatabaseContext : IdentityDbContext<CustomUser>
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

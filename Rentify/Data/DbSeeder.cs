using Microsoft.AspNetCore.Identity;
using Rentify.Auth.Models;

namespace Rentify.Data
{
    public class DbSeeder
    {
        private readonly UserManager<CustomUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public DbSeeder(UserManager<CustomUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await CreateAdminUser();
        }

        private async Task CreateAdminUser()
        {
            var newAdminUser = new CustomUser
            {
                Email = "admin@rentify.com",
                UserName = "Admin",
                RealName = "Rentify",
                RealSurname = "Administratorius"
            };

            var existingAdminUser = await _userManager.FindByEmailAsync(newAdminUser.Email);
            if(existingAdminUser == null)
            {
                var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "GoodPassword1!");
                if(createAdminUserResult.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdminUser, Roles.All);
                }
            }
        }

        private async Task AddDefaultRoles()
        {
            foreach(var role in Roles.All)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);

                if (!roleExists)
                    await _roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
}

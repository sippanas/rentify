using Microsoft.AspNetCore.Identity;

namespace Rentify.Auth.Models
{
    public class CustomUser : IdentityUser
    {
        [PersonalData]
        public string? RealName { get; set; }

        [PersonalData]
        public string? RealSurname { get; set; }
    }
}

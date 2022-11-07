using System.ComponentModel.DataAnnotations;

namespace Rentify.Auth.Models
{
    public class AuthDtos
    {
        public record RegisterUserDto
        (
            [Required] 
            string Name, 
            
            [Required] 
            string Surname,

            [Required]
            [EmailAddress]
            string Email,

            [Required]
            string Password
        );

        public record LoginUserDto(string Email, string Password);

        public record UserDto(string Id, string Email);

        public record SuccessfulLoginDto(string AccessToken);
    }
}

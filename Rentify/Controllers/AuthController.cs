using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Rentify.Auth;
using Rentify.Auth.Models;
using static Rentify.Auth.Models.AuthDtos;

namespace Rentify.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<CustomUser> _userManager;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(UserManager<CustomUser> userManager, IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var user = await _userManager.FindByEmailAsync(registerUserDto.Email);
            if (user != null)
                return BadRequest(); // User with this email already exists

            var newUser = new CustomUser
            {
                Email = registerUserDto.Email,
                UserName = registerUserDto.Email,
                RealName = registerUserDto.Name,
                RealSurname = registerUserDto.Surname,
            };

            var createUserResult = await _userManager.CreateAsync(newUser, registerUserDto.Password);

            if(!createUserResult.Succeeded)
                return BadRequest();

            await _userManager.AddToRoleAsync(newUser, Roles.User);

            return CreatedAtAction(nameof(Register), new UserDto(newUser.Id, newUser.Email));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserDto loginUserDto)
        {
            var user = await _userManager.FindByEmailAsync(loginUserDto.Email);
            if (user == null)
                return BadRequest(); // User does not exist

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);
            if (!isPasswordValid)
                return BadRequest();

            var userRoles = await _userManager.GetRolesAsync(user);
            var accessToken = _jwtTokenService.CreateAccessToken(user.Email, user.Id, userRoles);

            return Ok(new SuccessfulLoginDto(accessToken));
        }
    }
}

﻿using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Rentify.Auth
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly SymmetricSecurityKey _authSigningKey;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtTokenService(IConfiguration configuration)
        {
            _authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            _issuer = configuration["JWT:ValidIssuer"];
            _audience = configuration["JWT:ValidAudience"];
        }

        public string CreateAccessToken(string userEmail, string userId, IEnumerable<string> userRoles)
        {
            var authClaims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Email, userEmail),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Sub, userId)
            };

            authClaims.AddRange(userRoles.Select(userRole => new Claim(ClaimTypes.Role, userRole)));
            authClaims.AddRange(userRoles.Select(userRole => new Claim("UserRoles", userRole)));

            var accessSecurityToken = new JwtSecurityToken
            (
                issuer: _issuer,
                audience: _audience,
                expires: DateTime.UtcNow.AddHours(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(_authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(accessSecurityToken);
        }
    }
}

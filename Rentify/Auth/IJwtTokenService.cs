namespace Rentify.Auth
{
    public interface IJwtTokenService
    {
        string CreateAccessToken(string userEmail, string userId, IEnumerable<string> userRoles);
    }
}
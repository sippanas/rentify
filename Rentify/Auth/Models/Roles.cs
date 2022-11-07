namespace Rentify.Auth.Models
{
    public static class Roles
    {
        public const string User = nameof(User);
        public const string Administrator = nameof(Administrator);

        public static readonly IReadOnlyCollection<string> All = new[] { User, Administrator }; 
    }
}

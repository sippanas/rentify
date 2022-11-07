using Microsoft.AspNetCore.Authorization;
using Rentify.Auth.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Rentify.Auth
{
    public class ResourceOwnerAuthorizationHandler : AuthorizationHandler<ResourceOwnerRequirement, IUserOwnedResource>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ResourceOwnerRequirement requirement, IUserOwnedResource resource)
        {
            if(context.User.IsInRole(Roles.Administrator) || 
                context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) == resource.OwnerId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public record ResourceOwnerRequirement : IAuthorizationRequirement;
}

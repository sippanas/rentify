using Rentify.Auth.Models;
using Rentify.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Rentify.Data.Dtos
{
    public record ObjectDto(int Id, string? Address, int Price, string? RelevantInformation, 
        int ObjectTypeId, ObjectType ObjectType, string OccupierId, CustomUser Occupier);
    public record CreateObjectDto([Required] string Address, int Price, string? RelevantInformation);
    public record UpdateObjectDto([Required] string Address, int Price, string? RelevantInformation);
}

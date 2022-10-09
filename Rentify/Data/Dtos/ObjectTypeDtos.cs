using System.ComponentModel.DataAnnotations;

namespace Rentify.Data.Dtos
{
    public record ObjectTypeDto(int id, string? Name);
    public record CreateObjectTypeDto([Required] string Name);
    public record UpdateObjectTypeDto([Required] string Name);
}

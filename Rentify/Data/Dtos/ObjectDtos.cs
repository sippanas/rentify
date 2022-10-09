using System.ComponentModel.DataAnnotations;

namespace Rentify.Data.Dtos
{
    public record ObjectDto(int Id, string? Address, int Price, string? RelevantInformation, int ObjectTypeId);
    public record CreateObjectDto([Required] string Address, int Price, string? RelevantInformation);
    public record UpdateObjectDto([Required] string Address, int Price, string? RelevantInformation);
}

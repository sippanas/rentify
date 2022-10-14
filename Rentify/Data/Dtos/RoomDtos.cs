using System.ComponentModel.DataAnnotations;

namespace Rentify.Data.Dtos
{
    public record RoomDto(int Id, string? Name, int Size, int ObjectId);
    public record CreateRoomDto(
        [Required] string? Name, 
        [Range(1, 1000)] int Size);
    public record UpdateRoomDto(
        [Required] string? Name, 
        [Range(1, 1000)] int Size);
}

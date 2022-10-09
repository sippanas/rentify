using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public interface IRoomsRepository
    {
        Task Create(Room room);
        Task Delete(Room room);
        Task<Room> Get(int objectId, int roomId);
        Task<IEnumerable<Room>> GetAll(int objectId);
        Task Put(Room room);
    }
}
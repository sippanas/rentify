using Microsoft.EntityFrameworkCore;
using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public class RoomsRepository : IRoomsRepository
    {
        private readonly DatabaseContext _dbContext;

        public RoomsRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Room>> GetAll(int objectId)
        {
            return await _dbContext.Rooms.Where(x => x.ObjectId == objectId).ToListAsync();
        }

        public async Task<Room> Get(int objectId, int roomId)
        {
            return await _dbContext.Rooms.FirstOrDefaultAsync(x => x.ObjectId == objectId && x.Id == roomId);
        }

        public async Task Create(Room room)
        {
            _dbContext.Rooms.Add(room);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Put(Room room)
        {
            _dbContext.Rooms.Update(room);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Room room)
        {
            _dbContext.Rooms.Remove(room);
            await _dbContext.SaveChangesAsync();
        }
    }
}

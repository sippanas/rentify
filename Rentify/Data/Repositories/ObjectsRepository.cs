using Microsoft.EntityFrameworkCore;
using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public class ObjectsRepository : IObjectsRepository
    {
        private readonly DatabaseContext _dbContext;

        public ObjectsRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Models.Object>> GetAll(int objectTypeId)
        {
            return await _dbContext.Objects.Where(x => x.ObjectTypeId == objectTypeId).ToListAsync();
        }

        public async Task<Models.Object> Get(int objectTypeId, int objectId)
        {
            return await _dbContext.Objects
                .Include(x => x.ObjectType)
                .Include(x => x.Occupier)
                .FirstOrDefaultAsync(x => x.ObjectTypeId == objectTypeId && x.Id == objectId);
        }

        public async Task<IEnumerable<Models.Object>> GetOwned(string userId)
        {
            return await _dbContext.Objects.Where(x => x.OwnerId == userId)
                .Include(x => x.ObjectType)
                .Include(x => x.Occupier)
                .ToListAsync();
        }

        public async Task<IEnumerable<Models.Object>> GetRented(string userId)
        {
            return await _dbContext.Objects.Where(x => x.OccupierId == userId)
                .Include(x => x.ObjectType)
                .Include(x => x.Owner)
                .ToListAsync();
        }

        public async Task Create(Models.Object newObject)
        {
            _dbContext.Objects.Add(newObject);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Put(Models.Object selectedObject)
        {
            _dbContext.Objects.Update(selectedObject);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(Models.Object selectedObject)
        {
            _dbContext.Objects.Remove(selectedObject);
            await _dbContext.SaveChangesAsync();
        }
    }
}

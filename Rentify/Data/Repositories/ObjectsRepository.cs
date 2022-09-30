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

        public async Task<IEnumerable<Models.Object>> GetAll(ObjectType objectType)
        {
            return await _dbContext.Objects.Where(x => x.ObjectType == objectType).ToListAsync();
        }

        public async Task<Models.Object> Get(ObjectType objectType, int objectId)
        {
            return await _dbContext.Objects.FirstOrDefaultAsync(x => x.ObjectType == objectType && x.Id == objectId);
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

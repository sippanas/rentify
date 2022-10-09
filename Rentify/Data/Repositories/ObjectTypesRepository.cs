using Microsoft.EntityFrameworkCore;
using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public class ObjectTypesRepository : IObjectTypesRepository
    {
        private readonly DatabaseContext _dbContext;

        public ObjectTypesRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ObjectType>> GetAll()
        {
            return await _dbContext.ObjectTypes.ToListAsync();
        }

        public async Task<ObjectType> Get(int id)
        {
            return await _dbContext.ObjectTypes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Create(ObjectType objectType)
        {
            _dbContext.ObjectTypes.Add(objectType);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Put(ObjectType objectType)
        {
            _dbContext.ObjectTypes.Update(objectType);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(ObjectType objectType)
        {
            _dbContext.ObjectTypes.Remove(objectType);
            await _dbContext.SaveChangesAsync();
        }
    }
}

using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public interface IObjectsRepository
    {
        Task Create(Models.Object newObject);
        Task Delete(Models.Object selectedObject);
        Task<Models.Object> Get(ObjectType objectType, int objectId);
        Task<IEnumerable<Models.Object>> GetAll(ObjectType objectType);
        Task Put(Models.Object selectedObject);
    }
}
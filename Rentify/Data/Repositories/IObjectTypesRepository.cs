using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public interface IObjectTypesRepository
    {
        Task<ObjectType> Create(ObjectType objectType);
        Task Delete(ObjectType objectType);
        Task<ObjectType> Get(int id);
        Task<IEnumerable<ObjectType>> GetAll();
        Task<ObjectType> Put(ObjectType objectType);
    }
}
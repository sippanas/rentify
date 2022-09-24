using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public interface IObjectTypesRepository
    {
        Task<ObjectType> Create();
        Task Delete();
        Task<ObjectType> Get(int id);
        Task<IEnumerable<ObjectType>> GetAll();
        Task<ObjectType> Put();
    }
}
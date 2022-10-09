namespace Rentify.Data.Repositories
{
    public interface IObjectsRepository
    {
        Task Create(Models.Object newObject);
        Task Delete(Models.Object selectedObject);
        Task<Models.Object> Get(int objectTypeId, int objectId);
        Task<IEnumerable<Models.Object>> GetAll(int objectTypeId);
        Task Put(Models.Object selectedObject);
    }
}
using Rentify.Data.Models;

namespace Rentify.Data.Repositories
{
    public class ObjectTypesRepository : IObjectTypesRepository
    {
        public async Task<IEnumerable<ObjectType>> GetAll()
        {
            return new List<ObjectType>
            {
                new ObjectType()
                {
                    Name = "Butas"
                },
                new ObjectType()
                {
                    Name = "Namas"
                },
                new ObjectType()
                {
                    Name = "Garažas"
                }
            };
        }

        public async Task<ObjectType> Get(int id)
        {
            return new ObjectType()
            {
                Name = "Butas"
            };
        }

        public async Task<ObjectType> Create(ObjectType objectType)
        {
            return new ObjectType()
            {
                Name = "Butas"
            };
        }

        public async Task<ObjectType> Put(ObjectType objectType)
        {
            return new ObjectType()
            {
                Name = "Butas"
            };
        }

        public async Task Delete(ObjectType objectType)
        {

        }
    }
}

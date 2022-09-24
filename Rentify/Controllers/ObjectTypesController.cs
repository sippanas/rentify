using Microsoft.AspNetCore.Mvc;
using Rentify.Data.Models;
using Rentify.Data.Repositories;

namespace Rentify.Controllers
{
    /*
         * GET ALL 200
         * GET 200
         * POST 201
         * PUT 200
         * DELETE 200
    */

    [ApiController]
    [Route("api/object-types")]
    public class ObjectTypesController
    {
        private readonly IObjectTypesRepository _objectTypesRepository;

        public ObjectTypesController(IObjectTypesRepository objectTypesRepository)
        {
            _objectTypesRepository = objectTypesRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ObjectType>> GetAll()
        {
            return await _objectTypesRepository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ObjectType> Get(int id)
        {
            return await _objectTypesRepository.Get(id);
        }


    }
}

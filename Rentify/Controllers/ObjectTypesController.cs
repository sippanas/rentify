using Microsoft.AspNetCore.Mvc;
using Rentify.Data.Dtos;
using Rentify.Data.Models;
using Rentify.Data.Repositories;

namespace Rentify.Controllers
{
    [ApiController]
    [Route("api/object-types")]
    public class ObjectTypesController : ControllerBase
    {
        private readonly IObjectTypesRepository _objectTypesRepository;

        public ObjectTypesController(IObjectTypesRepository objectTypesRepository)
        {
            _objectTypesRepository = objectTypesRepository;
        }

        // GET: /api/object-types
        [HttpGet]
        public async Task<IEnumerable<ObjectType>> GetAll()
        {
            return await _objectTypesRepository.GetAll();
        }

        // GET: /api/object-types/1
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectType>> Get(int id)
        {
            var result = await _objectTypesRepository.Get(id);
            if (result == null) return NotFound($"Object type with ID {id} was not found.");

            return Ok(result);
        }

        // POST: /api/object-types
        [HttpPost]
        public async Task<ActionResult<ObjectType>> Post(ObjectTypeDto objectTypeDto)
        {
            var newObjectType = new ObjectType { Name = objectTypeDto.name };

            await _objectTypesRepository.Create(newObjectType);

            return Created($"/api/object-types/{newObjectType.Id}", newObjectType);
        }

        // PUT: /api/object-types/1
        [HttpPut("{id}")]
        public async Task<ActionResult<ObjectType>> Put(int id, ObjectTypeDto objectTypeDto)
        {
            var result = await _objectTypesRepository.Get(id);
            if (result == null) return NotFound($"Object type with ID {id} was not found.");

            result.Name = objectTypeDto.name;

            await _objectTypesRepository.Put(result);

            return Ok(result);
        }

        // DELETE: /api/object-types/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<ObjectType>> Delete(int id)
        {
            var result = await _objectTypesRepository.Get(id);
            if (result == null) return NotFound($"Object type with ID {id} was not found.");

            await _objectTypesRepository.Delete(result);

            return NoContent();
        }
    }
}

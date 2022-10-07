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
        public async Task<IEnumerable<ObjectTypeDto>> GetAll()
        {
            var objectTypes = await _objectTypesRepository.GetAll();

            IEnumerable<ObjectTypeDto> objectTypesDto = 
                objectTypes.Select(x => new ObjectTypeDto(x.Id, x.Name));

            return objectTypesDto;

        }

        // GET: /api/object-types/1
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectType>> Get(int id)
        {
            var result = await _objectTypesRepository.Get(id);
            if (result == null) return NotFound();

            return Ok(result);
        }

        // POST: /api/object-types
        [HttpPost]
        public async Task<ActionResult<ObjectType>> Post(CreateObjectTypeDto objectTypeDto)
        {
            var newObjectType = new ObjectType { Name = objectTypeDto.Name };

            await _objectTypesRepository.Create(newObjectType);

            return Created($"/api/object-types/{newObjectType.Id}", newObjectType);
        }

        // PUT: /api/object-types/1
        [HttpPut("{id}")]
        public async Task<ActionResult<ObjectType>> Put(int id, UpdateObjectTypeDto objectTypeDto)
        {
            var result = await _objectTypesRepository.Get(id);
            if (result == null) return NotFound();

            result.Name = objectTypeDto.Name;

            await _objectTypesRepository.Put(result);

            return Ok(result);
        }

        // DELETE: /api/object-types/1
        [HttpDelete("{id}")]
        public async Task<ActionResult<ObjectType>> Delete(int id)
        {
            var result = await _objectTypesRepository.Get(id);
            if (result == null) return NotFound();

            await _objectTypesRepository.Delete(result);

            return NoContent();
        }
    }
}

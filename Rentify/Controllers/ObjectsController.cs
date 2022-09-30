using Microsoft.AspNetCore.Mvc;
using Rentify.Data.Dtos;
using Rentify.Data.Models;
using Rentify.Data.Repositories;

namespace Rentify.Controllers
{
    [ApiController]
    [Route("api/object-types/{objectTypeId}/objects")]
    public class ObjectsController : ControllerBase
    {
        private readonly IObjectsRepository _objectsRepository;
        private readonly IObjectTypesRepository _objectsTypesRepository;

        public ObjectsController(IObjectsRepository objectsRepository, IObjectTypesRepository objectsTypesRepository)
        {
            _objectsRepository = objectsRepository;
            _objectsTypesRepository = objectsTypesRepository;
        }

        // GET: /api/object-types/1/objects
        [HttpGet]
        public async Task<IEnumerable<ObjectDto>> GetAll(ObjectType objectType)
        {
            var objectsOfType = await _objectsRepository.GetAll(objectType);

            var objectsDto = objectsOfType.Select(x => new ObjectDto(x.Address, x.Price, x.RelevantInformation));

            return objectsDto;
        }

        // GET: /api/object-types/1/objects/2
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectDto>> Get(ObjectType objectType, int objectId)
        {
            var selectedObject = await _objectsRepository.Get(objectType, objectId);
            if (selectedObject == null) return NotFound($"Object with ID {objectId} was not found.");

            return Ok(selectedObject);
        }
    }
}

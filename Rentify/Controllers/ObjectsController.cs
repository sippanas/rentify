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
        public async Task<ActionResult<IEnumerable<ObjectDto>>> GetAll(int objectTypeId)
        {
            var objectType = await _objectsTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var objectsOfType = await _objectsRepository.GetAll(objectTypeId);

            var objectsDto = objectsOfType.Select(x => 
                    new ObjectDto(x.Id, x.Address, x.Price, x.RelevantInformation, x.ObjectTypeId));

            return Ok(objectsDto);
        }

        // GET: /api/object-types/1/objects/2
        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectDto>> Get(int objectTypeId, int objectId)
        {
            var selectedObject = await _objectsRepository.Get(objectTypeId, objectId);
            if (selectedObject == null) return NotFound();

            return Ok(selectedObject);
        }
    }
}

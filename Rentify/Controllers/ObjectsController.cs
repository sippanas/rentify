using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rentify.Auth.Models;
using Rentify.Data.Dtos;
using Rentify.Data.Models;
using Rentify.Data.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Rentify.Controllers
{
    [ApiController]
    [Route("api/object-types/{objectTypeId}/objects")]
    [Authorize(Roles = Roles.User)]
    public class ObjectsController : ControllerBase
    {
        private readonly IObjectsRepository _objectsRepository;
        private readonly IObjectTypesRepository _objectsTypesRepository;
        private readonly IAuthorizationService _authorizationService;

        public ObjectsController(IObjectsRepository objectsRepository, IObjectTypesRepository objectsTypesRepository,
            IAuthorizationService authorizationService)
        {
            _objectsRepository = objectsRepository;
            _objectsTypesRepository = objectsTypesRepository;
            _authorizationService = authorizationService;
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
        [HttpGet("{objectId}")]
        public async Task<ActionResult<ObjectDto>> Get(int objectTypeId, int objectId)
        {
            var selectedObject = await _objectsRepository.Get(objectTypeId, objectId);
            if (selectedObject == null) return NotFound();

            var selectedObjectDto = new ObjectDto(selectedObject.Id, selectedObject.Address,
                selectedObject.Price, selectedObject.RelevantInformation, selectedObject.ObjectTypeId);

            return Ok(selectedObjectDto);
        }

        // GET: /api/objects/owned
        [HttpGet]
        [Route("/api/objects/owned")]
        public async Task<ActionResult<ObjectDto>> GetOwnedObjectsByUser()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var objects = await _objectsRepository.GetOwned(userId);

            IEnumerable<ObjectDto> objectsDto = 
                objects.Select(x => new ObjectDto(x.Id, x.Address, x.Price, x.RelevantInformation, x.ObjectTypeId));

            return Ok(objectsDto);
        }

        // POST: /api/object-types/{objectTypeId}/objects
        [HttpPost]
        public async Task<ActionResult<Data.Models.Object>> Post(int objectTypeId, CreateObjectDto createObjectDto)
        {
            var objectType = await _objectsTypesRepository.Get(objectTypeId);
            if(objectType == null) return NotFound();

            var newObject = new Data.Models.Object
            {
                Address = createObjectDto.Address,
                Price = createObjectDto.Price,
                RelevantInformation = createObjectDto.RelevantInformation,
                ObjectTypeId = objectTypeId,
                OwnerId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _objectsRepository.Create(newObject);

            return Created($"/api/object-types/{objectTypeId}/objects/{newObject.Id}", newObject);
        }

        // PUT: /api/object-types/1/objects/2
        [HttpPut("{objectId}")]
        public async Task<ActionResult<Data.Models.Object>> Put(int objectTypeId, int objectId, UpdateObjectDto updateObjectDto)
        {
            var objectType = await _objectsTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var updatableObject = await _objectsRepository.Get(objectTypeId, objectId);
            if (updatableObject == null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, updatableObject, PolicyNames.ResourceOwner);
            if(!authorizationResult.Succeeded) return Forbid();

            updatableObject.Address = updateObjectDto.Address;
            updatableObject.Price = updateObjectDto.Price;
            updatableObject.RelevantInformation = updateObjectDto.RelevantInformation;

            await _objectsRepository.Put(updatableObject);

            return Ok(updatableObject);
        }

        // DELETE: /api/object-types/1/objects/2
        [HttpDelete("{objectId}")]
        public async Task<ActionResult<Data.Models.Object>> Delete(int objectTypeId, int objectId)
        {
            var objectType = await _objectsTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var removableObject = await _objectsRepository.Get(objectTypeId, objectId);
            if (removableObject == null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, removableObject, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded) return Forbid();

            await _objectsRepository.Delete(removableObject);

            return NoContent();
        }
    }
}

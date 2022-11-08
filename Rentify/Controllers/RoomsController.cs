using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rentify.Auth.Models;
using Rentify.Data.Dtos;
using Rentify.Data.Models;
using Rentify.Data.Repositories;

namespace Rentify.Controllers
{
    [ApiController]
    [Route("api/object-types/{objectTypeId}/objects/{objectId}/rooms")]
    [Authorize(Roles = Roles.User)]
    public class RoomsController : ControllerBase
    {
        private readonly IObjectTypesRepository _objectTypesRepository;
        private readonly IObjectsRepository _objectsRepository;
        private readonly IRoomsRepository _roomsRepository;
        private readonly IAuthorizationService _authorizationService;

        public RoomsController(IObjectTypesRepository objectTypesRepository,
            IObjectsRepository objectsRepository, IRoomsRepository roomsRepository, IAuthorizationService authorizationService)
        {
            _objectTypesRepository = objectTypesRepository;
            _objectsRepository = objectsRepository;
            _roomsRepository = roomsRepository;
            _authorizationService = authorizationService;
        }

        // GET: /api/object-types/1/objects/2/rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetAll(int objectTypeId, int objectId)
        {
            var objectType = await _objectTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var _object = await _objectsRepository.Get(objectTypeId, objectId);
            if (_object == null) return NotFound();

            var rooms = await _roomsRepository.GetAll(objectId);

            var roomsDto = rooms.Select(x => new RoomDto(x.Id, x.Name, x.Size, x.ObjectId));

            return Ok(rooms);
        }

        // GET: /api/object-types/1/objects/2/rooms/3
        [HttpGet("{roomId}")]
        public async Task<ActionResult<Room>> Get(int objectTypeId, int objectId, int roomId)
        {
            var objectType = await _objectTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var _object = await _objectsRepository.Get(objectTypeId, objectId);
            if (_object == null) return NotFound();

            var room = await _roomsRepository.Get(objectId, roomId);
            if (room == null) return NotFound();

            var roomDto = new RoomDto(room.Id, room.Name, room.Size, room.ObjectId);

            return Ok(roomDto);
        }

        // POST: /api/object-types/1/objects/2/rooms
        [HttpPost]
        public async Task<ActionResult<Room>> Post(int objectTypeId, int objectId, CreateRoomDto createRoomDto)
        {
            var objectType = await _objectTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var _object = await _objectsRepository.Get(objectTypeId, objectId);
            if (_object == null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, _object, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded) return Forbid();

            var newRoom = new Room
            {
                Name = createRoomDto.Name,
                Size = createRoomDto.Size,
                ObjectId = objectId
            };

            await _roomsRepository.Create(newRoom);

            return Created($"/api/object-types/{objectTypeId}/objects/{objectId}/rooms/{newRoom.Id}", newRoom);
        }

        // PUT: /api/object-types/1/objects/2/rooms/3
        [HttpPut("{roomId}")]
        public async Task<ActionResult<Room>> Put(int objectTypeId, int objectId, int roomId, UpdateRoomDto updateRoomDto)
        {
            var objectType = await _objectTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var _object = await _objectsRepository.Get(objectTypeId, objectId);
            if (_object == null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, _object, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded) return Forbid();

            var room = await _roomsRepository.Get(objectId, roomId);
            if (room == null) return NotFound();    

            room.Name = updateRoomDto.Name;
            room.Size = updateRoomDto.Size;

            await _roomsRepository.Put(room);

            return Ok(room);
        }

        // DELETE: /api/object-types/1/objects/2/rooms/3
        [HttpDelete("{roomId}")]
        public async Task<ActionResult<Room>> Delete(int objectTypeId, int objectId, int roomId)
        {
            var objectType = await _objectTypesRepository.Get(objectTypeId);
            if (objectType == null) return NotFound();

            var _object = await _objectsRepository.Get(objectTypeId, objectId);
            if (_object == null) return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, _object, PolicyNames.ResourceOwner);
            if (!authorizationResult.Succeeded) return Forbid();

            var room = await _roomsRepository.Get(objectId, roomId);
            if (room == null) return NotFound();

            await _roomsRepository.Delete(room);

            return NoContent();
        }
    }
}

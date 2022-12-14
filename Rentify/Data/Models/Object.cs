using Rentify.Auth.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Rentify.Data.Models
{
    public class Object : IUserOwnedResource
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public int Price { get; set; }
        public string? RelevantInformation { get; set; }

        public int ObjectTypeId { get; set; }
        public ObjectType ObjectType { get; set; }

        // Needs counter

        [Required]
        public string OwnerId { get; set; }
        public CustomUser Owner { get; set; }

        public string? OccupierId { get; set; }
        public CustomUser? Occupier { get; set; }
    }
}

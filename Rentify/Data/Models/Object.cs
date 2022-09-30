namespace Rentify.Data.Models
{
    public class Object
    {
        public int Id { get; set; }
        public string? Address { get; set; }
        public int Price { get; set; }
        public string? RelevantInformation { get; set; }
        public ObjectType? ObjectType { get; set; }
        // Needs counter
    }
}

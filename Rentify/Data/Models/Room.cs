namespace Rentify.Data.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Size { get; set; }

        public int ObjectId { get; set; }
        public Object? Object { get; set; }
    }
}

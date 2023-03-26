namespace DTOs
{
    public class User : BaseEntity
    {
        public enum Status { ACTIVE, SUSPENDED, BANNED, DELETED }

        public string name { get; set; }
        public string firstLastName { get; set; }
        public string secondLastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string userPicture { get; set; }
        public DateTime registrationDate { get; set; }
        public Status status { get; set; }
    }
}

namespace DTOs
{
    public class User : BaseEntity
    {
        public enum UserStatus { ACTIVE, SUSPENDED, BANNED, DELETED, INACTIVE }

        public string name { get; set; }
        public string firstLastName { get; set; }
        public string secondLastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string phone { get; set; }
        public string userPicture { get; set; }
        public DateTime registrationDate { get; set; }
        public UserStatus userStatus { get; set; }
    }
}

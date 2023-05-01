namespace DTOs
{
    public class Suscription : BaseEntity
    {
        public enum SuscriptionStatus { ACTIVE, INACTIVE, CANCELLED, EXPIRED }
        public int userId { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public int membershipId { get; set; }
        public SuscriptionStatus suscriptionStatus { get; set; }
    }
}

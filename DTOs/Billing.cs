namespace DTOs
{
    public class Billing : BaseEntity
    {

        public int suscriptionId { get; set; }
        public int userId { get; set; }
        public DateTime billingDate { get; set; }
        public float amount { get; set; }

    }
}

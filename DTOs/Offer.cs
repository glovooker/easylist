namespace DTOs
{
    public class Offer : BaseEntity
    {
        public int user_id { get; set; }
        public int tender_id { get; set; }
        public string comment { get; set; }
        public float totalCost { get; set; }
        public DateTime dueDate { get; set; }

        public List<ProductOffer> ProductOffers { get; set; }

    }

}

namespace DTOs
{
    public class ProductOffer : BaseEntity
    {
        public int product_id { get; set; }
        public int offer_id { get; set; }
        public float quantity { get; set; }
        public float price { get; set; }
        public bool verified { get; set; }

    }

}

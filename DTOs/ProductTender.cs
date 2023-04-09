namespace DTOs
{
    public class ProductTender : BaseEntity
    {

        public int product_id { get; set; }
        public int tender_id { get; set; }
        public float quantity { get; set; }
        public float price { get; set; }

    }

}

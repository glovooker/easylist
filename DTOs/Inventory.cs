namespace DTOs
{
    public class Inventory : BaseEntity
    {

        public int user_id { get; set; }
        public int product_id { get; set; }
        public float quantity { get; set; }
        public float price { get; set; }

    }

}

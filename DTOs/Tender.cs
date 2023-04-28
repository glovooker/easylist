namespace DTOs
{
    public class Tender : BaseEntity
    {
        public enum TenderStatus { OPEN, CLOSED, AWARD, ONGOING, FINISHED, TERMINATED }

        public string title { get; set; }
        public string description { get; set; }
        public TenderStatus tenderStatus { get; set; }
        public DateTime maxDeliverDate { get; set; }
        public DateTime maxOfferDate { get; set; }
        public float budget { get; set; }
        public string QRcode { get; set; }
        public bool automatic { get; set; }
        public int analistId { get; set; }
        public int? offerId { get; set; }
        public string deliverLocation { get; set; }

        public List<ProductTender> ProductTenders { get; set; }


    }
}

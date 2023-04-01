namespace DTOs
{
    public class Tender : BaseEntity
    {

        public Tender() { }

        public enum TenderStatus { OPEN, CLOSED, ONGOING, FINISHED, TERMINATED }

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

    }

}

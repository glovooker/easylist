namespace DTOs
{
    public class Binnacle : BaseEntity
    {

        public DateTime dateHour { get; set; }
        public string actionType { get; set; }
        public int affectedObject_id { get; set; }
        public string tableAffected { get; set; }

    }

}

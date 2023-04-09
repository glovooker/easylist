namespace DTOs
{
    public class Binnacle : BaseEntity
    {

        public int user_id { get; set; }
        public DateTime dateHour { get; set; }
        public string actionType { get; set; }
        public int affectedObject_id { get; set; }
        public string tableAffected { get; set; }
        public string oldValue { get; set; }
        public string newValue { get; set; }

    }

}

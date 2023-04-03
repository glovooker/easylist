namespace DTOs
{
    public class Membership : BaseEntity
    {
        public enum MembershipType { MONTHLY, ANNUAL}
        public string name { get; set; }
        public string description { get; set; }

        public MembershipType membershipType { get; set; }

        public float cost { get; set; }

    }
}

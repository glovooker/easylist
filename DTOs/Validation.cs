using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class Validation : BaseEntity
    {
        public enum ValidationType { EMAIL, PHONE, BOTH}
        public enum ValidationStatus { PENDING, VALIDATED, EXPIRED}
        public string userId { get; set; }
        public ValidationType validationType { get; set; }
        public ValidationStatus validationStatus { get; set; }
        public string validationCode { get; set; }
        public DateTime validationDateCreation { get; set; }
        public DateTime validationDateExpired { get; set; }
        public int validationCount { get; set; }
    }
}

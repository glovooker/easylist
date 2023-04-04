using System;
namespace DTOs
{
	public class Password : BaseEntity
	{
		public int idUser { get; set; }
		public string password { get; set; }
		public DateTime creationDate { get; set; }
		public Boolean isActive { get; set; }
	}
}


using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class MembershipManager
    {
        public void Create(Membership membership)
        {
            var crudMembership = new MembershipCrudFactory();
            var existMembership = crudMembership.RetrieveById<Membership>(membership.Id);

            if (existMembership != null)
            {
                throw new Exception("Membership already exists!");
            }
            crudMembership.Create(membership);
        }

        public void Update(Membership membership) 
        { 
            var crudMembership= new MembershipCrudFactory();
            var existMembersip = crudMembership.RetrieveById<Membership>(membership.Id);
            if (existMembersip == null)
            {
                throw new Exception("Membership does not exist!");

            }
            crudMembership.Update(membership);
        }

        public void Delete(Membership membership)
        {
            var crudMembership= new MembershipCrudFactory();
            var existMembership = crudMembership.RetrieveById<Membership>(membership.Id);

            if (existMembership == null)
            {
                throw new Exception("Membership does not exist!");

            }

            crudMembership.Delete(membership);
        }

        public Membership RetrieveById(int id)
        {
            var crudMembership= new MembershipCrudFactory();
            var existMembership = crudMembership.RetrieveById<Membership>(id);

            if (existMembership == null)
            {
                throw new Exception("Membership does not exist!");

            }

            return existMembership;
        }

        public List<Membership> RetrieveAll()
        {
            var crudMembership=new MembershipCrudFactory();
            return crudMembership.RetrieveAll<Membership>();

        }
    }
}

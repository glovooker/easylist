using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class SuscriptionManager
    {
        public void Create(Suscription suscription)
        {
            var crudSuscription = new SuscriptionCrudFactory();
            crudSuscription.Create(suscription);

            var crudBilling = new BillingCrudFactory();
            var crudMembership = new MembershipCrudFactory();
            var existSuscription = crudSuscription.RetrieveById<Suscription>(suscription.userId);
            var receipt = new Billing();

            receipt.Id = 0;
            receipt.userId = suscription.userId;
            receipt.suscriptionId = existSuscription.Id;
            receipt.billingDate = DateTime.Now;
            receipt.amount = crudMembership.RetrieveById<Membership>(suscription.membershipId).cost;

            if (existSuscription == null)
            {
                throw new Exception("Suscription doesn't exist!");
            }

            crudBilling.Create(receipt);
        }

        public void Update(Suscription suscription)
        {
            var crudSuscription = new SuscriptionCrudFactory();
            var existMembersip = crudSuscription.RetrieveById<Suscription>(suscription.userId);
            if (existMembersip == null)
            {
                throw new Exception("Suscription does not exist!");

            }
            crudSuscription.Update(suscription);
        }

        public void Delete(Suscription suscription)
        {
            var crudSuscription = new SuscriptionCrudFactory();
            var existSuscription = crudSuscription.RetrieveById<Suscription>(suscription.userId);

            if (existSuscription == null)
            {
                throw new Exception("Suscription does not exist!");

            }

            crudSuscription.Delete(suscription);
        }

        public Suscription RetrieveById(int id)
        {
            var crudSuscription = new SuscriptionCrudFactory();
            var existSuscription = crudSuscription.RetrieveById<Suscription>(id);

            if (existSuscription == null)
            {
                throw new Exception("Suscription does not exist!");

            }

            return existSuscription;
        }

        public List<Suscription> RetrieveAll()
        {
            var crudSuscription = new SuscriptionCrudFactory();
            return crudSuscription.RetrieveAll<Suscription>();

        }
        public List<Suscription> RetrieveAllStatus()
        {
            var crudSuscription = new SuscriptionCrudFactory();
            return crudSuscription.RetrieveAllStatus<Suscription>();

        }
    }
}

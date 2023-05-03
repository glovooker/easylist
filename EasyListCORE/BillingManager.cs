using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class BillingManager
    {
        public void Create(Billing billing)
        {
            var crudBilling = new BillingCrudFactory();
            crudBilling.Create(billing);
        }

        public void Update(Billing billing)
        {
            throw new NotImplementedException();
        }

        public void Delete(Billing billing)
        {
            throw new NotImplementedException();
        }

        public List<Billing> RetrieveById(int id)
        {
            var crudBilling = new BillingCrudFactory();
            return crudBilling.RetrieveByUserId<Billing>(id);
        }

        public List<Billing> RetrieveAll()
        {
            throw new NotImplementedException();
        }
    }
}

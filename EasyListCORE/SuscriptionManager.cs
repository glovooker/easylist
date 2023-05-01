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
        }

        public void Update(Suscription suscription)
        {
            var crudSuscription = new SuscriptionCrudFactory();
            var existMembersip = crudSuscription.RetrieveById<Suscription>(suscription.Id);
            if (existMembersip == null)
            {
                throw new Exception("Suscription does not exist!");

            }
            crudSuscription.Update(suscription);
        }

        public void Delete(Suscription suscription)
        {
            var crudSuscription = new SuscriptionCrudFactory();
            var existSuscription = crudSuscription.RetrieveById<Suscription>(suscription.Id);

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
    }
}

using DTOs;
using EasyListDataAccess.CRUD;
using EasyListDataAccess.DAOs;

namespace EasyListCORE
{
    public class TenderManager
    {

        public void Create(Tender tender)
        {

            var crudTender = new TenderCrudFactory();

            var existTender = crudTender.RetrieveById<Tender>(tender.Id);

            if (existTender != null )
            {
                throw new Exception("Tender already exists!");
            }

            crudTender.Create(tender);

        }

        public void Update(Tender tender)
        {
            var crudTender = new TenderCrudFactory();
            var existTender = crudTender.RetrieveById<Tender>(tender.Id);

            if (existTender == null )
            {
                throw new Exception("Tender does not exist!");
            }

            crudTender.Update(tender);

        }

        public void Delete(Tender tender)
        {
            var crudTender = new TenderCrudFactory();
            var existLicitacion = crudTender.RetrieveById<Tender>(tender.Id);

            if (existLicitacion == null )
            {
                throw new Exception("Tender does not exist!");
            }

            crudTender.Delete(tender);

        }

        public Tender RetrieveById(int id)
        {
            var crudTender = new TenderCrudFactory();
            var existLicitacion = crudTender.RetrieveById<Tender>(id);

            if (existLicitacion == null )
            {
                throw new Exception("Tender does not exist!");
            }

            return existLicitacion;

        }

        public List<Tender> RetrieveAll()
        {
            var crudTender = new TenderCrudFactory();
            return crudTender.RetrieveAll<Tender>();
        }

        public List<Tender> RetrieveByDate(string startDate, string endDate)
        {
            var crudTender = new TenderCrudFactory();
            return crudTender.RetrieveByDate<Tender>(startDate, endDate);
        }

    }

}

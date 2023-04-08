using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class ProductTenderManager
    {
        public void Create(ProductTender producttender)
        {

            var crudProductTender = new ProductTenderCrudFactory();

            crudProductTender.Create(producttender);

        }

        public void Update(ProductTender producttender)
        {

            var crudProductTender = new ProductTenderCrudFactory();

            crudProductTender.Update(producttender);

        }
        
        public void Delete(ProductTender producttender)
        {

            var crudProductTender = new ProductTenderCrudFactory();

            crudProductTender.Delete(producttender);

        }

        public List<ProductTender> RetrieveAll()
        {
            var crudProducTender = new ProductTenderCrudFactory();
            return crudProducTender.RetrieveAll<ProductTender>();
        }

        public List<ProductTender> RetrieveByTenderId(int id)
        {
            var productTenderFactory = new ProductTenderCrudFactory();
            return productTenderFactory.RetrieveByTenderId<ProductTender>(id);
        }

    }

}

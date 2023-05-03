using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class ProductOfferManager
    {
        public void Create(ProductOffer productoffer)
        {

            var crudProductOffer = new ProductOfferCrudFactory();

            crudProductOffer.Create(productoffer);

        }

        public void Update(ProductOffer productoffer)
        {

            var crudProductOffer = new ProductOfferCrudFactory();

            crudProductOffer.Update(productoffer);

        }

        public void Delete(ProductOffer productoffer)
        {

            var crudProductOffer = new ProductOfferCrudFactory();

            crudProductOffer.Delete(productoffer);

        }

        public void DeleteAll(int tender_id)
        {

            var crudProductOffer = new ProductOfferCrudFactory();

            crudProductOffer.DeleteAll(tender_id);

        }

        public List<ProductOffer> RetrieveAll()
        {
            var crudProductOffer = new ProductOfferCrudFactory();
            return crudProductOffer.RetrieveAll<ProductOffer>();
        }

        public List<ProductOffer> RetrieveByOfferId(int id)
        {
            var crudProductFactory = new ProductOfferCrudFactory();
            return crudProductFactory.RetrieveByOfferId<ProductOffer>(id);
        }

    }

}

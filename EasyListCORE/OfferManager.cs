using DTOs;
using EasyListDataAccess.CRUD;
using Twilio.Rest.Trunking.V1;

namespace EasyListCORE
{
    public class OfferManager
    {

        public void Create(Offer offer)
        {
            var crudOffer = new OfferCrudFactory();
            var crudProductOffer = new ProductOfferCrudFactory();
            var existOffer = crudOffer.RetrieveById<Offer>(offer.Id);

            if (existOffer != null)
            {
                throw new Exception("Offer already exists!");
            }

            crudOffer.Create(offer);

            var generatedId = crudOffer.RetrieveAll<Offer>().Last().Id;

            offer.Id = generatedId;

            var currentOffer = crudOffer.RetrieveById<Offer>(offer.Id);

            if (currentOffer == null)
            {
                throw new Exception("Offer not found.");
            }

            foreach (var productOffer in offer.ProductOffers)
            {
                productOffer.offer_id = currentOffer.Id;
                crudProductOffer.Create(productOffer);
            }
        }

        public void Update(Offer offer)
        {
            var crudOffer = new OfferCrudFactory();
            var existOffer = crudOffer.RetrieveById<Offer>(offer.Id);

            if (existOffer == null)
            {
                throw new Exception("Offer does not exist!");
            }

            var crudProductOffer = new ProductOfferCrudFactory();
            crudProductOffer.DeleteAll(existOffer.Id);

            foreach (var productOffer in offer.ProductOffers)
            {
                productOffer.offer_id = existOffer.Id;
                crudProductOffer.Create(productOffer);
            }

            crudOffer.Update(offer);

        }

        public void Delete(Offer offer)
        {
            var crudOffer = new OfferCrudFactory();
            var existOffer = crudOffer.RetrieveById<Offer>(offer.Id);

            if (existOffer == null)
            {
                throw new Exception("Offer does not exist!");
            }

            foreach (var productOffer in offer.ProductOffers)
            {
                var crudProductOffer = new ProductOfferCrudFactory();
                productOffer.offer_id = existOffer.Id;
                crudProductOffer.Delete(productOffer);
            }

            crudOffer.Delete(offer);

        }

        public Offer RetrieveById(int id)
        {
            var crudOffer = new OfferCrudFactory();
            var crudProductOffer = new ProductOfferCrudFactory();
            var existLicitacion = crudOffer.RetrieveById<Offer>(id);

            if (existLicitacion == null)
            {
                throw new Exception("Offer does not exist!");
            }

            var offerProducts = crudProductOffer.RetrieveByOfferId<ProductOffer>(id);

            if (offerProducts != null)
            {
                existLicitacion.ProductOffers = offerProducts;
            }

            return existLicitacion;

        }

        public List<Offer> RetrieveAll()
        {
            var crudOffer = new OfferCrudFactory();
            var crudProductOffer = new ProductOfferCrudFactory();
            var offerList = crudOffer.RetrieveAll<Offer>();
            foreach (var offer in offerList)
            {
                offer.ProductOffers = crudProductOffer.RetrieveByOfferId<ProductOffer>(offer.Id);
            }
            return offerList;
        }

        public List<Offer> RetrieveByDate(string startDate, string endDate)
        {
            var crudOffer = new OfferCrudFactory();
            return crudOffer.RetrieveByDate<Offer>(startDate, endDate);
        }

        public Offer CheckUserOffer(int user, int tender)
        {
            var crudOffer = new OfferCrudFactory();
            var existingOffers = crudOffer.CheckExistingOffers<Offer>(tender, user);

            if (existingOffers != null && existingOffers.Count > 0)
            {
                throw new Exception("The user has already made an offer for this tender.");
            }

            // Si no hay ofertas existentes, devuelve null
            return null;
        }

        public List<Offer> RetrieveByTenderId(int id)
        {
            var crudOffer = new OfferCrudFactory();
            var existingOffers = crudOffer.RetrieveByTenderId<Offer>(id);

            if (existingOffers == null)
            {
                throw new Exception("This tender has no offers!");
            }

            return existingOffers;

        }
    }

}

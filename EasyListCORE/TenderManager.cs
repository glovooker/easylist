using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class TenderManager
    {

        public void Create(Tender tender)
        {
            var crudTender = new TenderCrudFactory();
            var crudProductTender = new ProductTenderCrudFactory();
            var existTender = crudTender.RetrieveById<Tender>(tender.Id);

            if (existTender != null)
            {
                throw new Exception("Tender already exists!");
            }

            crudTender.Create(tender);

            var generatedId = crudTender.RetrieveAll<Tender>().Last().Id;

            tender.Id = generatedId;

            var currentTender = crudTender.RetrieveById<Tender>(tender.Id);

            if (currentTender == null)
            {
                throw new Exception("Tender not found.");
            }

            foreach (var productTender in tender.ProductTenders)
            {
                productTender.tender_id = currentTender.Id;
                crudProductTender.Create(productTender);
            }
        }

        public void Update(Tender tender)
        {
            var crudTender = new TenderCrudFactory();
            var existTender = crudTender.RetrieveById<Tender>(tender.Id);

            if (existTender == null)
            {
                throw new Exception("Tender does not exist!");
            }

            var crudProductTender = new ProductTenderCrudFactory();
            crudProductTender.DeleteAll(existTender.Id);

            foreach (var productTender in tender.ProductTenders)
            {
                productTender.tender_id = existTender.Id;
                crudProductTender.Create(productTender);
            }

            crudTender.Update(tender);

        }

        public void Delete(Tender tender)
        {
            var crudTender = new TenderCrudFactory();
            var existTender = crudTender.RetrieveById<Tender>(tender.Id);

            if (existTender == null)
            {
                throw new Exception("Tender does not exist!");
            }

            foreach (var productTender in tender.ProductTenders)
            {
                var crudProductTender = new ProductTenderCrudFactory();
                productTender.tender_id = existTender.Id;
                crudProductTender.Delete(productTender);
            }

            crudTender.Delete(tender);

        }

        public Tender RetrieveById(int id)
        {
            var crudTender = new TenderCrudFactory();
            var crudProductTender = new ProductTenderCrudFactory();
            var existLicitacion = crudTender.RetrieveById<Tender>(id);

            if (existLicitacion == null)
            {
                throw new Exception("Tender does not exist!");
            }

            var tenderProducts = crudProductTender.RetrieveByTenderId<ProductTender>(id);

            if (tenderProducts != null)
            {
                existLicitacion.ProductTenders = tenderProducts;
            }

            return existLicitacion;

        }

        public List<Tender> RetrieveAll()
        {
            var crudTender = new TenderCrudFactory();
            var crudProductTender = new ProductTenderCrudFactory();
            var tenderList = crudTender.RetrieveAll<Tender>();
            foreach (var tender in tenderList)
            {
                tender.ProductTenders = crudProductTender.RetrieveByTenderId<ProductTender>(tender.Id);
            }
            return tenderList;
        }

        public List<Tender> RetrieveByDate(string startDate, string endDate)
        {
            var crudTender = new TenderCrudFactory();
            return crudTender.RetrieveByDate<Tender>(startDate, endDate);
        }

        public List<Tender> RetrieveByAnalystId(int id)
        {
            var crudTender = new TenderCrudFactory();
            var crudProductTender = new ProductTenderCrudFactory();
            var tenderList = crudTender.RetrieveByAnalystId<Tender>(id);

            if (tenderList == null)
            {
                throw new Exception("The analyst has no tenders!");
            }
            foreach (var tender in tenderList)
            {
                tender.ProductTenders = crudProductTender.RetrieveByTenderId<ProductTender>(tender.Id);
            }

            return tenderList;

        }

        public void AwardWithOfferId(int tenderId, int offerId)
        {
            var crudTender = new TenderCrudFactory();
            var existTender = crudTender.RetrieveById<Tender>(tenderId);

            if (existTender == null)
            {
                throw new Exception("Tender does not exist!");
            }

            var crudOffer = new OfferCrudFactory();
            var existOffer = crudOffer.RetrieveById<Offer>(offerId);

            if (existOffer == null)
            {
                throw new Exception("Offer does not exist!");
            }

            var userId = existOffer.user_id;

            var crudUser = new UserCrudFactory();
            var existUser = crudUser.RetrieveById<User>(userId);

            if (existUser == null)
            {
                throw new Exception("User does not exist!");
            }

            var offerorPhone = existUser.phone;
            var offerorEmail = existUser.email;

            var nm = new NotificationManager();

            var message = "<html><body><p>Hello " + existUser.name + " " + existUser.firstLastName + ",</p>" +
            "<p>We are pleased to inform you that your offer has been selected for award in the tender " + tenderId + ".</p>" +
            "<p>Additionally, we want to remind you of the importance of reviewing the terms and conditions of the contract before accepting it.</p>" +
            "<p>Thank you for participating in this tender and congratulations on your success.</p>" +
            "<p>Best regards,</p>" +
            "<p>The EasyList team</p></body></html>";
            var messageText = "Hello " + existUser.name + " " + existUser.firstLastName + "," +
            "We are pleased to inform you that your offer has been selected for award in the tender " + tenderId + "." +
            "Additionally, we want to remind you of the importance of reviewing the terms and conditions of the contract before accepting it." +
            "Thank you for participating in this tender and congratulations on your success." +
            "Best regards," +
            "The EasyList team";

            nm.NotifyByEmail(message, offerorEmail);
            nm.NotifyBySMS(messageText, offerorPhone);

            crudTender.AwardWithOfferId(tenderId, offerId);

        }

    }

}

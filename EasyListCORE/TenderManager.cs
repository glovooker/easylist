﻿using DTOs;
using EasyListDataAccess.CRUD;
using EasyListDataAccess.DAOs;

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

    }

}

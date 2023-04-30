using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class ProductOfferCrudFactory : CrudFactory
    {
        private ProductOfferMapper _mapper;
        public ProductOfferCrudFactory()
        {
            _mapper = new ProductOfferMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var productoffer = (ProductOffer)dto;
            var sqlOperation = _mapper.GetCreateStatement(productoffer);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlTender = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlTender);

            var dic = new Dictionary<string, object>();

            if (results.Count > 0)
            {
                dic = results[0];
                var obj = _mapper.BuildObject(dic);
                return (T)Convert.ChangeType(obj, typeof(T));
            }

            return default(T);
        }

        public override List<Tender> RetrieveAll<Tender>()
        {
            var lstTenders = new List<Tender>();
            var sqlTender = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlTender);

            if (lstResults.Count > 0)
            {
                var objsTenders = _mapper.BuildObjects(lstResults);

                foreach (var op in objsTenders)
                {
                    lstTenders.Add((Tender)Convert.ChangeType(op, typeof(Tender)));
                }
            }

            return lstTenders;
        }

        public override void Update(BaseEntity dto)
        {
            var productoffer = (ProductOffer)dto;
            var sqlOperation = _mapper.GetUpdateStatement(productoffer);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            var productoffer = (ProductOffer)dto;
            var sqlOperation = _mapper.GetDeleteStatement(productoffer);
            dao.ExecuteProcedure(sqlOperation);
        }
        public void DeleteAll(int offer_id)
        {
            var sqlOperation = _mapper.GetDeleteAllStatement(offer_id);
            dao.ExecuteProcedure(sqlOperation);
        }

        public List<ProductOffer> RetrieveByOfferId<ProductOffer>(int id)
        {

            var lstProducTender = new List<ProductOffer>();
            var sqlProductOffer = _mapper.GetRetrieveByIdStatement(id);
            var lstResults = dao.ExecuteQueryProcedure(sqlProductOffer);

            if (lstResults.Count > 0)
            {
                var objsProductOffer = _mapper.BuildObjects(lstResults);

                foreach (var op in objsProductOffer)
                {
                    lstProducTender.Add((ProductOffer)Convert.ChangeType(op, typeof(ProductOffer)));
                }
            }

            return lstProducTender;
        }

    }
}

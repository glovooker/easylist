using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class ProductTenderCrudFactory : CrudFactory
    {
        private ProductTenderMapper _mapper;
        public ProductTenderCrudFactory()
        {
            _mapper = new ProductTenderMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var producttender = (ProductTender)dto;
            var sqlOperation = _mapper.GetCreateStatement(producttender);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Update(BaseEntity dto)
        {
            var producttender = (ProductTender)dto;
            var sqlOperation = _mapper.GetUpdateStatement(producttender);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            var producttender = (ProductTender)dto;
            var sqlOperation = _mapper.GetDeleteStatement(producttender);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override List<ProductTender> RetrieveAll<ProductTender>()
        {
            var lstProducTender = new List<ProductTender>();
            var sqlProductTender = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlProductTender);

            if (lstResults.Count > 0)
            {
                var objsProductTender = _mapper.BuildObjects(lstResults);

                foreach (var op in objsProductTender)
                {
                    lstProducTender.Add((ProductTender)Convert.ChangeType(op, typeof(ProductTender)));
                }
            }

            return lstProducTender;
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public List<ProductTender> RetrieveByTenderId<ProductTender>(int id)
        {

            var lstProducTender = new List<ProductTender>();
            var sqlProductTender = _mapper.GetRetrieveByIdStatement(id);
            var lstResults = dao.ExecuteQueryProcedure(sqlProductTender);

            if (lstResults.Count > 0)
            {
                var objsProductTender = _mapper.BuildObjects(lstResults);

                foreach (var op in objsProductTender)
                {
                    lstProducTender.Add((ProductTender)Convert.ChangeType(op, typeof(ProductTender)));
                }
            }

            return lstProducTender;
        }

        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

    }
}

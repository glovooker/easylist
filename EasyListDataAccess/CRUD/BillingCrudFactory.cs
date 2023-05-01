using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class BillingCrudFactory : CrudFactory
    {
        private BillingMapper _mapper;
        public BillingCrudFactory()
        {
            _mapper = new BillingMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity dto)
        {
            var billing = (Billing)dto;
            var sqlOperation = _mapper.GetCreateStatement(billing);
            dao.ExecuteQueryProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public List<Billing> RetrieveByUserId<Billing>(int id)
        {
            var lstBilling = new List<Billing>();
            var sqlOperationToRetrieve = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlOperationToRetrieve);

            var dic = new Dictionary<string, object>();

            if (results.Count > 0)
            {
                var objsTenders = _mapper.BuildObjects(results);

                foreach (var op in objsTenders)
                {
                    lstBilling.Add((Billing)Convert.ChangeType(op, typeof(Billing)));
                }
            }

            return lstBilling;

        }

        public override void Update(BaseEntity dto)
        {
            throw new NotImplementedException();
        }
    }
}

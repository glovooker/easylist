using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class TenderCrudFactory : CrudFactory
    {

        private TenderMapper _mapper;

        public TenderCrudFactory()
        {
            _mapper = new TenderMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var tender = (Tender)dto;

            var sqlOperationToCreate = _mapper.GetCreateStatement(tender);

            dao.ExecuteProcedure(sqlOperationToCreate);

        }

        public override void Update(BaseEntity dto)
        {
            var tender = (Tender)dto;

            var sqlOperation = _mapper.GetUpdateStatement(tender);

            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {

            var tender = (Tender)dto;

            var sqlOperation = _mapper.GetDeleteStatement(tender);

            dao.ExecuteProcedure(sqlOperation);

        }

        public override T RetrieveById<T>(int id)
        {

            var sqlOperationToRetrieve = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlOperationToRetrieve);

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
            var tenders = new List<Tender>();

            //Buscamos el statement para hacer un retrieve all
            var sqlOperation = _mapper.GetRetrieveAllStatement();

            //Retrieve all
            var lstResults = dao.ExecuteQueryProcedure(sqlOperation);

            if (lstResults.Count > 0)
            {
                var objsUsersOperation = _mapper.BuildObjects(lstResults);

                foreach (var op in objsUsersOperation)
                {
                    tenders.Add((Tender)Convert.ChangeType(op, typeof(Tender)));
                }
            }

            return tenders;

        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }
    }
}

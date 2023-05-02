using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class SuscriptionCrudFactory : CrudFactory
    {
        private SuscriptionMapper _mapper;
        public SuscriptionCrudFactory()
        {
            _mapper = new SuscriptionMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity dto)
        {
            var suscription = (Suscription)dto;
            var sqlOperation = _mapper.GetCreateStatement(suscription);
            dao.ExecuteQueryProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            var suscriptionToDelete = (Suscription)dto;
            var sqlOperation = _mapper.GetDeleteStatement(suscriptionToDelete);
            dao.ExecuteQueryProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstMemberships = new List<T>();
            var sqlOperationToRetrieve = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlOperationToRetrieve);

            if (lstResults.Count > 0)
            {
                var objsMemberships = _mapper.BuildObjects(lstResults);

                foreach (var mem in objsMemberships)
                {
                    lstMemberships.Add((T)Convert.ChangeType(mem, typeof(T)));

                }
            }

            return lstMemberships;
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
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

        public override void Update(BaseEntity dto)
        {
            var suscriptionToUpdate = (Suscription)dto;
            var sqlOperation = _mapper.GetUpdateStatement(suscriptionToUpdate);
            dao.ExecuteQueryProcedure(sqlOperation);
        }
    }
}

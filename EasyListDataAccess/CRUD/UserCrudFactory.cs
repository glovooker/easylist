using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class UserCrudFactory : CrudFactory
    {
        private UserMapper _mapper;
        public UserCrudFactory()
        {
            _mapper = new UserMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var user = (User)dto;
            var sqlOperation = _mapper.GetCreateStatement(user);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstOperations = new List<T>();

            var sqlUser = _mapper.GetRetrieveAllStatement();

            var lstResults = dao.ExecuteQueryProcedure(sqlUser);

            if (lstResults.Count > 0)
            {
                var objsUsers = _mapper.BuildObjects(lstResults);

                foreach (var op in objsUsers)
                {
                    lstOperations.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }

            return lstOperations;
        }

        public override T RetrieveByEmail<T>(string email)
        {
            var sqlOperationToRetrieve = _mapper.GetRetrieveByEmailStatement(email);
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
            var userToUpdate = (User)dto;

            var sqlUser = _mapper.GetUpdateStatement(userToUpdate);

            dao.ExecuteProcedure(sqlUser);
        }

        public override void Delete(BaseEntity dto)
        {
            var userToDelete = (User)dto;

            var sqlUser = _mapper.GetDeleteStatement(userToDelete);

            dao.ExecuteProcedure(sqlUser);
        }
    }
}

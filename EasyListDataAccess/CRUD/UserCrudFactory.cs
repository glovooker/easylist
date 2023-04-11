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
            var sqlUser = _mapper.GetCreateStatement(user);
            dao.ExecuteProcedure(sqlUser);
        }

        public override T RetrieveByEmail<T>(string email)
        {
            var sqlUser = _mapper.GetRetrieveByEmailStatement(email);
            var results = dao.ExecuteQueryProcedure(sqlUser);

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
            var sqlUser = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlUser);

            var dic = new Dictionary<string, object>();

            if (results.Count > 0)
            {
                dic = results[0];
                var obj = _mapper.BuildObject(dic);
                return (T)Convert.ChangeType(obj, typeof(T));
            }

            return default(T);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstUsers = new List<T>();
            var sqlUser = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlUser);

            if (lstResults.Count > 0)
            {
                var objsUsers = _mapper.BuildObjects(lstResults);

                foreach (var op in objsUsers)
                {
                    lstUsers.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }

            return lstUsers;
        }

        public override void Update(BaseEntity dto)
        {
            var user = (User)dto;
            var sqlUser = _mapper.GetUpdateStatement(user);
            dao.ExecuteProcedure(sqlUser);
        }

        public override void Delete(BaseEntity dto)
        {
            var user = (User)dto;

            var sqlPassword = _mapper.GetDeletePasswordsStatement(user);
            dao.ExecuteProcedure(sqlPassword);

            var sqlPermission = _mapper.GetDeletePermissionsStatement(user);
            dao.ExecuteProcedure(sqlPermission);

            var sqlValidacion = _mapper.GetDeleteValidationStatement(user);
            dao.ExecuteProcedure(sqlValidacion);

            var sqlUser = _mapper.GetDeleteStatement(user);
            dao.ExecuteProcedure(sqlUser);

        }

        public List<T> RetrieveByDate<T>(string startDate, string endDate)
        {
            var lstUsers = new List<T>();
            var sqlUser = _mapper.GetRetrieveByDateStatement(startDate, endDate);
            var lstResults = dao.ExecuteQueryProcedure(sqlUser);

            if (lstResults.Count > 0)
            {
                var objsUsers = _mapper.BuildObjects(lstResults);

                foreach (var op in objsUsers)
                {
                    lstUsers.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }

            return lstUsers;
        }
    }
}

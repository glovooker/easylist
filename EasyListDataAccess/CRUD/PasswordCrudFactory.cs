using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class PasswordCrudFactory : CrudFactory
    {
        private PasswordMapper _mapper;
        public PasswordCrudFactory()
        {
            _mapper = new PasswordMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var password = (Password)dto;
            var sqlPassword = _mapper.GetCreateStatement(password);
            dao.ExecuteProcedure(sqlPassword);
        }

        public override T RetrieveByEmail<T>(string email)
        {
            var sqlPassword = _mapper.GetRetrieveByEmailStatement(email);
            var results = dao.ExecuteQueryProcedure(sqlPassword);

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
            throw new NotImplementedException();
        }

        public T RetrieveByUserId<T>(int id)
        {
            var sqlPassword = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlPassword);

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
            throw new NotImplementedException();
        }

        public List<T> RetrieveLastFive<T>(int id)
        {
            var lstPasswords = new List<T>();
            var sqlPassword = _mapper.GetRetrieveLastFive(id);
            var lstResults = dao.ExecuteQueryProcedure(sqlPassword);

            if (lstResults.Count > 0)
            {
                var objsPasswords = _mapper.BuildObjects(lstResults);

                foreach (var op in objsPasswords)
                {
                    lstPasswords.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }

            return lstPasswords;
        }

        public override void Update(BaseEntity dto)
        {
            var password = (Password)dto;
            var sqlPassword = _mapper.GetUpdateStatement(password);
            dao.ExecuteProcedure(sqlPassword);
        }

        public override void Delete(BaseEntity dto)
        {
            var password = (Password)dto;
            var sqlPassword = _mapper.GetDeleteStatement(password);
            dao.ExecuteProcedure(sqlPassword);
        }

        public void DisPassword(int id)
        {
            var sqlPassword = _mapper.GetDisablePasswordStatement(id);
            dao.ExecuteProcedure(sqlPassword);
        }
    }
}


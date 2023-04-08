using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess.CRUD
{
    public class ValidationCrudFactory : CrudFactory
    {

        private ValidationMapper _mapper;

        public ValidationCrudFactory() : base()
        {
            _mapper = new ValidationMapper();
            dao = SqlDao.GetInstance();
        }


        public override void Create(BaseEntity dto)
        {
            var validation = (Validation)dto;
            var sqlValidation = _mapper.GetCreateStatement(validation);
            dao.ExecuteProcedure(sqlValidation);
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
            var sqlValidation = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlValidation);

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
            throw new NotImplementedException();
        }
        public void UpdatePhoneUser(BaseEntity dto)
        {
            var user = (User)dto;
            var sqlUser = _mapper.GetUpdatePhoneUserStatement(user);
            dao.ExecuteProcedure(sqlUser);
           
        }
    }
}

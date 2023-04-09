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
        public T RetrieveByUserId<T>(int idUser)
        {
            var sqlValidation = _mapper.GetRetrieveByUserIdStatement(idUser);
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
        public List<Validation> RetrievePendingValidationsByUserId(int userId)
        {
            var sql = _mapper.GetRetrieveByUserIdStatement(userId);
            var results = dao.ExecuteQueryProcedure(sql);
            var validations = new List<Validation>();
            foreach (var result in results)
            {
                var validation = (Validation)_mapper.BuildObject(result);
                if (validation.validationStatus == 0) // validación pendiente
                {
                    validations.Add(validation);
                }
            }
            return validations.Cast<Validation>().ToList();
        }

        public override void Update(BaseEntity dto)
        {
            var validation = (Validation)dto;
            var sqlValidation = _mapper.GetUpdateStatement(validation);
            dao.ExecuteProcedure(sqlValidation);
        }
        public void UpdatePhoneUser(BaseEntity dto)
        {
            var user = (User)dto;
            var sqlUser = _mapper.GetUpdatePhoneUserStatement(user);
            dao.ExecuteProcedure(sqlUser);
           
        }
    }
}

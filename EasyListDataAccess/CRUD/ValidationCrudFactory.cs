using DTOs;
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


        public override void Create(BaseEntity dto)
        {
            var validation = (Validation)dto;

            var sqlOperationToCreate = _mapper.GetCreateStatement(validation);

            dao.ExecuteProcedure(sqlOperationToCreate);

        
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

        public override void Update(BaseEntity dto)
        {
            throw new NotImplementedException();
        }
    }
}

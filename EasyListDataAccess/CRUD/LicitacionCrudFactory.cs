using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class LicitacionCrudFactory : CrudFactory
    {

        //Instancia de la clase LicitacionMapper

        private LicitacionMapper _mapper;

        public LicitacionCrudFactory()
        {
            _mapper = new LicitacionMapper();
            dao = SqlDao.GetInstance();
        }

        //Create CrudFactory

        public override void Create(BaseEntity dto)
        {
            var licitacion = (Licitacion)dto;
            var sqlOperationToCreate = _mapper.GetCreateStatement(licitacion);
            dao.ExecuteProcedure(sqlOperationToCreate);
        }

        //RetrieveById

        public override T RetrieveById<T>(int idLicitacion)
        {

            var sqlOperationToRetrieve = _mapper.GetRetrieveByIdStatement(idLicitacion);
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

        //RetrieveAll

        public override List<Licitacion> RetrieveAll<Licitacion>()
        {
            var licitacion = new List<Licitacion>();

            //Buscamos el statement para hacer un retrieve all
            var sqlOperation = _mapper.GetRetrieveAllStatement();

            //Retrieve all
            var lstResults = dao.ExecuteQueryProcedure(sqlOperation);

            if (lstResults.Count > 0)
            {
                var objsUsersOperation = _mapper.BuildObjects(lstResults);

                foreach (var op in objsUsersOperation)
                {
                    licitacion.Add((Licitacion)Convert.ChangeType(op, typeof(Licitacion)));
                }
            }
            return licitacion;
        }

        //Update
        public override void Update(BaseEntity dto)
        {
            var update = (Licitacion)dto;

            var sqlOperation = _mapper.GetUpdateStatement(update);

            dao.ExecuteProcedure(sqlOperation); 
        }

        public override void Delete(BaseEntity dto)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }
    }
}

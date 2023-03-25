using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess
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

    }

}

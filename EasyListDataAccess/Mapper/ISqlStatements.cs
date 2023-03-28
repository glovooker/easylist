using DTOs;
using EasyListDataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyListDataAccess.Mapper
{
    public interface ISqlStatements
    {

        SqlOperation GetCreateStatement(BaseEntity entity);
        SqlOperation GetRetrieveByIdStatement(int id);
        SqlOperation GetRetrieveAllStatement();
        SqlOperation GetUpdateStatement(BaseEntity entity);
        SqlOperation GetDeleteStatement(BaseEntity entity);

    }

}

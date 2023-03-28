using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.CRUD
{
    public abstract class CrudFactory
    {

        protected SqlDao dao;
        public abstract void Create(BaseEntity dto);
        public abstract T RetrieveById<T>(int id);
        public abstract List<T> RetrieveAll<T>();
        public abstract void Update(BaseEntity dto);
        public abstract void Delete(BaseEntity dto);

    }

}

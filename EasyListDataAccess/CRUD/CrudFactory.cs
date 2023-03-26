using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.CRUD
{
    public abstract class CrudFactory
    {
        protected SqlDao dao;
        public abstract void Create(BaseEntity dto);
        public abstract T RetrieveByEmail<T>(String email);
        public abstract T RetrieveById<T>(int id);
        public abstract List<T> RetrieveAll<T>();
        public abstract void Update(BaseEntity dto);
        public abstract void Delete(BaseEntity dto);
    }
}

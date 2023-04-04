using System.Security;
using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class PermissionCrudFactory : CrudFactory
    {
        private PermissionMapper _mapper;
        public PermissionCrudFactory()
        {
            _mapper = new PermissionMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var permission = (Permission)dto;
            var sqlPermission = _mapper.GetCreateStatement(permission);
            dao.ExecuteProcedure(sqlPermission);
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(int id)
        {
            var sqlPermission = _mapper.GetRetrieveByIdStatement(id);
            var results = dao.ExecuteQueryProcedure(sqlPermission);

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
            var lstPermissions = new List<T>();
            var sqlPermission = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlPermission);

            if (lstResults.Count > 0)
            {
                var objsPermissions = _mapper.BuildObjects(lstResults);

                foreach (var op in objsPermissions)
                {
                    lstPermissions.Add((T)Convert.ChangeType(op, typeof(T)));
                }
            }

            return lstPermissions;
        }

        public override void Update(BaseEntity dto)
        {
            var permission = (Permission)dto;
            var sqlPermission = _mapper.GetUpdateStatement(permission);
            dao.ExecuteProcedure(sqlPermission);
        }

        public override void Delete(BaseEntity dto)
        {
            var permission = (Permission)dto;
            var sqlPermission = _mapper.GetDeleteStatement(permission);
            dao.ExecuteProcedure(sqlPermission);
        }
    }
}

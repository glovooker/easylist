using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class ManagePermissionCrudFactory : CrudFactory
    {
        private ManagePermissionMapper _mapper;
        public ManagePermissionCrudFactory()
        {
            _mapper = new ManagePermissionMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var managepermission = (ManagePermission)dto;
            var sqlOperation = _mapper.GetCreateStatement(managepermission);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            var permissionToDelete = (ManagePermission)dto;

            var sqlPermission = _mapper.GetDeleteStatement(permissionToDelete);

            dao.ExecuteProcedure(sqlPermission);
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

        public T CheckUserPermission<T>(int user, int permission)
        {
            var sqlOperationToRetrieve = _mapper.GetRetrieveByIds(user, permission);
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
    }
}

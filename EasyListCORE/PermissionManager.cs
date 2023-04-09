using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class PermissionManager
    {
        public void Create(Permission permission)
        {
            var crudPermission = new PermissionCrudFactory();

            crudPermission.Create(permission);
        }

        public Permission RetrieveById(int id)
        {
            var crudPermission = new PermissionCrudFactory();
            var existPermission = crudPermission.RetrieveById<Permission>(id);

            if (existPermission == null)
            {
                throw new Exception("The permission does not exist!");
            }

            return existPermission;
        }

        public List<Permission> RetrieveAll()
        {
            var crudPermission = new PermissionCrudFactory();
            return crudPermission.RetrieveAll<Permission>();
        }

        public void Update(Permission permission)
        {
            var crudPermission = new PermissionCrudFactory();
            var existPermission = crudPermission.RetrieveById<Permission>(permission.Id);

            if (existPermission == null)
            {
                throw new Exception("The permission does not exist!");
            }

            crudPermission.Update(permission);
        }

        public void Delete(Permission permission)
        {
            var crudPermission = new PermissionCrudFactory();
            var existPermission = crudPermission.RetrieveById<Permission>(permission.Id);

            if (existPermission == null)
            {
                throw new Exception("The permission does not exist!");
            }

            crudPermission.Delete(permission);
        }

    }
}
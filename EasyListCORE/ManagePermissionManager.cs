using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class ManagePermissionManager
    {
        //public void Create(Permission permission)
        //{
        //    var crudPermission = new PermissionCrudFactory();

        //    crudPermission.Create(permission);
        //}

        //public void Delete(Permission permission)
        //{
        //    var crudPermission = new PermissionCrudFactory();
        //    var existPermission = crudPermission.RetrieveById<Permission>(permission.Id);

        //    if (existPermission == null)
        //    {
        //        throw new Exception("The permission does not exist!");
        //    }

        //    crudPermission.Delete(permission);
        //}

        public ManagePermission Check(ManagePermission managepermission)
        {
            var crudManagePermission = new ManagePermissionCrudFactory();
            return crudManagePermission.CheckUserPermission<ManagePermission>(managepermission.user_id, managepermission.permission_id);

        }


    }
}
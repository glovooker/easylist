using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class ManagePermissionManager
    {
        public void Create(ManagePermission managepermission)
        {
            var crudManagePermission = new ManagePermissionCrudFactory();

            crudManagePermission.Create(managepermission);
        }

        public void Delete(ManagePermission managepermission)
        {
            var crudManagePermission = new ManagePermissionCrudFactory();

            crudManagePermission.Delete(managepermission);
        }

        public List<ManagePermission> RetrieveByUserId(int id)
        {
            var crudManagePermission = new ManagePermissionCrudFactory();
            return crudManagePermission.RetrieveByUserId<ManagePermission>(id);
        }

        public ManagePermission Check(ManagePermission managepermission)
        {
            var crudManagePermission = new ManagePermissionCrudFactory();
            return crudManagePermission.CheckUserPermission<ManagePermission>(managepermission.user_id, managepermission.permission_id);

        }


    }
}
using DTOs;
using EasyListDataAccess.DAOs;
using System.Data.SqlClient;
using System.Data;
using System.Security;

namespace EasyListDataAccess.Mapper
{
    public class ManagePermissionMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var managepermission = new ManagePermission()
            {
                user_id = (int)row["ID_USUARIO"],
                permission_id = (int)row["ID_PERMISO"], 
            };

            return managepermission;
        }


        protected int GetIntValue(Dictionary<string, object> dic, string attName)
        {
            var val = dic[attName];
            if (dic.ContainsKey(attName) && (val is int || val is decimal))
                return (int)dic[attName];

            return -1;
        }

        protected string GetStringValue(Dictionary<string, object> dic, string attName)
        {
            if (dic.ContainsKey(attName) && dic[attName] is string)
                return (string)dic[attName];

            return null;
        }

        protected DateTime? GetDateTimeValue(Dictionary<string, object> dic, string attName)
        {
            if (dic.ContainsKey(attName) && dic[attName] is DateTime)
            {
                return (DateTime)dic[attName];
            }

            return null;
        }

        #region "SQL_Statements"


        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }


        public SqlOperation GetRetrieveByIds(int user, int permission)
        {
            var SqlOperation = new SqlOperation { ProcedureName = "CHECK_RELACION_USUARIO_PERMISO" };

            SqlOperation.AddIntParam("P_ID_USUARIO", user);
            SqlOperation.AddIntParam("P_ID_PERMISO", permission);

            return SqlOperation;
        }


        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}

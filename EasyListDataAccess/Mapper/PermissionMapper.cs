using DTOs;
using EasyListDataAccess.DAOs;
using System.Security;

namespace EasyListDataAccess.Mapper
{
    public class PermissionMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var permission = new Permission()
            {
                Id = (int)row["ID_PERMISO"],
                name = (string)row["NOMBREPERMISO"],
                description = (string)row["DESCRIPCIONPERMISO"],              
            };

            return permission;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newUser = BuildObject(row);
                lstResult.Add(newUser);
            }

            return lstResult;
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
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var permission = (Permission)entity;

            sqlOperation.ProcedureName = "CRE_PERMISO_PR";
            sqlOperation.AddVarcharParam("P_NOMBREPERMISO", permission.name);
            sqlOperation.AddVarcharParam("P_DESCRIPCIONPERMISO", permission.description);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_PERMISO_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_PERMISO", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_ALL_PERMISOS_PR";

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var permission = (Permission)entity;

            sqlOperation.ProcedureName = "UPD_PERMISO_PR";
            sqlOperation.AddIntParam("P_ID_PERMISO", permission.Id);
            sqlOperation.AddVarcharParam("P_NOMBREPERMISO", permission.name);
            sqlOperation.AddVarcharParam("P_DESCRIPCIONPERMISO", permission.description);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var permission = (Permission)entity;

            sqlOperation.ProcedureName = "DEL_PERMISO_PR";
            sqlOperation.AddIntParam("P_ID_PERMISO", permission.Id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}

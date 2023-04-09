using System.Security.Cryptography;
using System.Text;
using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class PasswordMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var password = new Password()
            {
                Id = (int)row["ID_CONTRASENIA"],
                idUser = (int)row["ID_USUARIO"],
                password = (string)row["CONTRASENIA"],
                creationDate = (DateTime)row["FECHACREACION"],
                isActive = (Boolean)row["ACTIVA"],
                isTemporal = (Boolean)row["TEMPORAL"]
            };

            return password;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newPassword = BuildObject(row);
                lstResult.Add(newPassword);
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

        public string EncryptPassword(string password)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hash);
        }


        #region "SQL_Statements"
        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var password = (Password)entity;

            sqlOperation.ProcedureName = "CRE_CONTRASENIA_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", password.idUser);
            sqlOperation.AddVarcharParam("P_CONTRASENIA", EncryptPassword(password.password));
            sqlOperation.AddBoolParam("P_ACTIVA", password.isActive);
            sqlOperation.AddBoolParam("P_TEMPORAL", password.isTemporal);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_CONTRASENIA_BY_EMAIL_PR";
            sqlOperation.AddVarcharParam("P_EMAIL", email);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_CONTRASENIA_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveLastFive(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_LAST_FIVE_CONTRASENIAS_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var password = (Password)entity;

            sqlOperation.ProcedureName = "UPD_CONTRASENIA_PR";
            sqlOperation.AddIntParam("P_ID_CONTRASENIA", password.Id);
            sqlOperation.AddBoolParam("P_ACTIVA", password.isActive);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var password = (Password)entity;

            sqlOperation.ProcedureName = "DEL_CONTRASENIA_PR";
            sqlOperation.AddIntParam("P_ID_CONTRASENIA", password.Id);

            return sqlOperation;
        }

        public SqlOperation GetDisablePasswordStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "DESC_CONTRASENIA_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }

        #endregion
    }
}
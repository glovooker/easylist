using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class UserMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var user = new User()
            {
                Id = (int)row["ID_USUARIO"],
                name = (string)row["NOMBRE"],
                firstLastName = (string)row["PRIMERAPELLIDO"],
                secondLastName = (string)row["SEGUNDOAPELLIDO"],
                email = (string)row["EMAIL"],
                phone = (string)row["TELEFONO"],
                userPicture = (string)row["FOTOUSUARIO"],
                registrationDate = (DateTime)row["FECHACREACION"],
                userStatus = (User.UserStatus)Enum.Parse(typeof(User.UserStatus), (string)row["ESTADO"])
            };

            return user;
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

            var user = (User)entity;

            sqlOperation.ProcedureName = "CRE_USUARIO_PR";
            sqlOperation.AddVarcharParam("P_NOMBRE", user.name);
            sqlOperation.AddVarcharParam("P_PRIMERAPELLIDO", user.firstLastName);
            sqlOperation.AddVarcharParam("P_SEGUNDOAPELLIDO", user.secondLastName);
            sqlOperation.AddVarcharParam("P_EMAIL", user.email);
            sqlOperation.AddVarcharParam("P_PHONE", user.phone);
            sqlOperation.AddVarcharParam("P_FOTOUSUARIO", user.userPicture);
            sqlOperation.AddVarcharParam("P_ESTADO", user.userStatus.ToString());

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_USUARIO_BY_EMAIL_PR";
            sqlOperation.AddVarcharParam("P_EMAIL", email);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_USUARIO_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_ALL_USUARIOS_PR";

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var user = (User)entity;

            sqlOperation.ProcedureName = "UPD_USUARIO_PR";
            sqlOperation.AddVarcharParam("P_NOMBRE", user.name);
            sqlOperation.AddVarcharParam("P_PRIMERAPELLIDO", user.firstLastName);
            sqlOperation.AddVarcharParam("P_SEGUNDOAPELLIDO", user.secondLastName);
            sqlOperation.AddVarcharParam("P_EMAIL", user.email);
            sqlOperation.AddVarcharParam("P_PHONE", user.phone);
            sqlOperation.AddVarcharParam("P_FOTOUSUARIO", user.userPicture);
            sqlOperation.AddVarcharParam("P_ESTADO", user.userStatus.ToString());

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var user = (User)entity;

            sqlOperation.ProcedureName = "DEL_USUARIO_PR";
            sqlOperation.AddVarcharParam("P_EMAIL", user.email);

            return sqlOperation;
        }

        #endregion
    }
}

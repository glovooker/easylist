using DTOs;
using EasyListDataAccess.DAOs;


namespace EasyListDataAccess.Mapper
{
    public class MembershipMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var membership = new Membership()
            {
                Id = (int)row["ID_PLAN"],
                name = (string)row["NOMBRE"],
                description = (string)row["DESCRIPCION"],
                membershipType = (Membership.MembershipType)Enum.Parse(typeof(Membership.MembershipType), (string)row["TIPO"]),
                cost = Convert.ToSingle(row["COSTO"]),
            };

            return membership;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();
            foreach (var row in lstRows)
            {
                var membership = BuildObject(row);
                lstResults.Add(membership);
            }
            return lstResults;
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

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();
            var membership = (Membership)entity;
            sqlOperation.ProcedureName = "CRE_PLAN_PR";
            sqlOperation.AddVarcharParam("P_NOMBRE", membership.name);
            sqlOperation.AddVarcharParam("P_DESCRIPCION", membership.description);
            sqlOperation.AddVarcharParam("P_TIPO", membership.membershipType.ToString());
            sqlOperation.AddFloatParam("P_COSTO", membership.cost);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();
            var membership = (Membership)entity;

            sqlOperation.ProcedureName = "DEL_PLAN_PR";
            sqlOperation.AddIntParam("P_ID_PLAN", membership.Id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_ALL_PLAN_PR";

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_PLAN_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_PLAN", id);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var membership = (Membership)entity;

            sqlOperation.ProcedureName = "UPD_PLAN_PR";
            sqlOperation.AddIntParam("P_ID_PLAN", membership.Id);
            sqlOperation.AddVarcharParam("P_NOMBRE", membership.name);
            sqlOperation.AddVarcharParam("P_DESCRIPCION", membership.description);
            sqlOperation.AddVarcharParam("P_TIPO", membership.membershipType.ToString());
            sqlOperation.AddFloatParam("P_COSTO", membership.cost);

            return sqlOperation;
        }
    }
}

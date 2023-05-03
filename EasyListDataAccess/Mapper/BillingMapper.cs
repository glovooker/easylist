using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class BillingMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var billing = new Billing()
            {
                Id = (int)row["ID_FACTURACION"],
                suscriptionId = (int)row["ID_SUSCRIPCION"],
                userId = (int)row["ID_USUARIO"],
                billingDate = (DateTime)row["FECHA"],
                amount = Convert.ToSingle(row["MONTO"])
            };

            return billing;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();
            foreach (var row in lstRows)
            {
                var billing = BuildObject(row);
                lstResults.Add(billing);
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
            var billing = (Billing)entity;
            sqlOperation.ProcedureName = "CRE_FACTURACION_PR";
            sqlOperation.AddIntParam("P_ID_SUSCRIPCION", billing.suscriptionId);
            sqlOperation.AddIntParam("P_ID_USUARIO", billing.userId);
            sqlOperation.AddDateTimeParam("P_FECHA", billing.billingDate);
            sqlOperation.AddFloatParam("P_MONTO", billing.amount);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_FACTURACION_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}

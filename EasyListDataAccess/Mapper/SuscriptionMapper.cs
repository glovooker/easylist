using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class SuscriptionMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var suscription = new Suscription()
            {
                Id = (int)row["ID_SUSCRIPCION"],
                userId = (int)row["ID_USUARIO"],
                startDate = (DateTime)row["FECHAINICIO"],
                endDate = (DateTime)row["FECHAFIN"],
                membershipId = (int)row["ID_PLAN"],
                suscriptionStatus = (Suscription.SuscriptionStatus)Enum.Parse(typeof(Suscription.SuscriptionStatus), (string)row["ESTADO"]),
            };

            return suscription;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResults = new List<BaseEntity>();
            foreach (var row in lstRows)
            {
                var suscription = BuildObject(row);
                lstResults.Add(suscription);
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
            var suscription = (Suscription)entity;
            sqlOperation.ProcedureName = "CRE_SUSCRIPCION_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", suscription.userId);
            sqlOperation.AddDateTimeParam("P_FECHAINICIO", suscription.startDate);
            sqlOperation.AddDateTimeParam("P_FECHAFIN", suscription.endDate);
            sqlOperation.AddIntParam("P_ID_PLAN", suscription.membershipId);
            sqlOperation.AddVarcharParam("P_ESTADO", suscription.suscriptionStatus.ToString());

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();
            var suscription = (Suscription)entity;

            sqlOperation.ProcedureName = "DEL_SUSCRIPCION_PR";
            sqlOperation.AddIntParam("P_ID_SUSCRIPCION", suscription.Id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_ALL_SUSCRIPCION_PR";

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_SUSCRIPCION_BY_ID_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }
        public SqlOperation GetRetrieveByStatusStatement()
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_SUSCRIPCION_BY_STATUS_PR";
            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var suscription = (Suscription)entity;

            sqlOperation.ProcedureName = "UPD_SUSCRIPCION_PR";
            sqlOperation.AddIntParam("P_ID_SUSCRIPCION", suscription.Id);
            sqlOperation.AddIntParam("P_ID_USUARIO", suscription.userId);
            sqlOperation.AddDateTimeParam("P_FECHAINICIO", suscription.startDate);
            sqlOperation.AddDateTimeParam("P_FECHAFIN", suscription.endDate);
            sqlOperation.AddIntParam("P_ID_PLAN", suscription.membershipId);
            sqlOperation.AddVarcharParam("P_ESTADO", suscription.suscriptionStatus.ToString());

            return sqlOperation;
        }
    }
}

using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class BinnacleMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var binnacle = new Binnacle()
            {
                Id = (int)row["ID_BITACORA"],
                user_id = (int)row["ID_USUARIO"],
                dateHour = (DateTime)row["FECHAHORA"],
                actionType = (string)row["TIPOACCION"],
                affectedObject_id = (int)row["IDOBJETOAFECTADO"],
                tableAffected = (string)row["TABLAAFECTADA"],
                oldValue = (string)row["VALORANTIGUO"],
                newValue = (string)row["VALORNUEVO"]
            };
            return binnacle;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newBinnacle = BuildObject(row);
                lstResult.Add(newBinnacle);
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

        public SqlOperation GetCreateStatement(BaseEntity entity)
        {
            var binnacle = (Binnacle)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "CRE_BITACORA_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", binnacle.user_id);
            sqlOperation.AddDateTimeParam("P_FECHAHORA", binnacle.dateHour);
            sqlOperation.AddVarcharParam("P_TIPOACCION", binnacle.actionType);
            sqlOperation.AddIntParam("P_IDOBJETOAFECTADO", binnacle.affectedObject_id);
            sqlOperation.AddVarcharParam("P_TABLAAFECTADA", binnacle.tableAffected);
            sqlOperation.AddVarcharParam("P_VALORANTIGUO", binnacle.oldValue);
            sqlOperation.AddVarcharParam("P_VALORNUEVO", binnacle.newValue);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "RET_ALL_BITACORA_PR" };

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "RET_BITACORA_BY_ID_PR" };

            sqlOperation.AddIntParam("P_ID_BITACORA", id);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            throw new NotImplementedException();
        }

    }

}

using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class OfferMapper : ISqlStatements, IObjectMapper
    {

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var offer = new Offer()
            {
                Id = (int)row["ID_OFERTA"],
                user_id = (int)row["ID_OFERENTE"],
                tender_id = (int)row["ID_LICITACION"],
                chosen = (bool)row["ELEGIDA"],
                totalCost = Convert.ToSingle(row["COSTOTOTAL"]),
                dueDate = (DateTime)row["FECHAENTREGA"]
            };
            return offer;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newTender = BuildObject(row);
                lstResult.Add(newTender);
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
            var offer = (Offer)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "CRE_OFERTA_PR";
            sqlOperation.AddIntParam("P_ID_OFERENTE", offer.user_id);
            sqlOperation.AddIntParam("P_ID_LICITACION", offer.tender_id);
            sqlOperation.AddBoolParam("P_ELEGIDA", offer.chosen);
            sqlOperation.AddFloatParam("P_COSTOTOTAL", offer.totalCost);
            sqlOperation.AddDateTimeParam("P_FECHAENTREGA", offer.dueDate);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var offer = (Offer)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "UPD_OFERTA_PR";
            sqlOperation.AddIntParam("P_ID_OFERTA", offer.Id);
            sqlOperation.AddIntParam("P_ID_OFERENTE", offer.user_id);
            sqlOperation.AddBoolParam("P_ELEGIDA", offer.chosen);
            sqlOperation.AddFloatParam("P_COSTOTOTAL", offer.totalCost);
            sqlOperation.AddDateTimeParam("P_FECHAENTREGA", offer.dueDate);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "DEL_OFERTA_PR" };

            var offer = (Offer)entity;

            sqlOperation.AddIntParam("P_ID_OFERTA", offer.Id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_OFERTA_BY_ID_PR" };

            sqlOperation.AddIntParam("P_ID_OFERTA", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_ALL_OFERTA_PR" };

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveByDateStatement(string startDate, string endDate)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_OFERTAS_POR_FECHAS_PR";
            sqlOperation.AddVarcharParam("StartDate", startDate);
            sqlOperation.AddVarcharParam("EndDate", endDate);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveCheckExistingOffers(int tender, int user)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "RET_OFERTAS_BY_TENDER_USER_PR";
            sqlOperation.AddIntParam("P_LICITACION", tender);
            sqlOperation.AddIntParam("P_OFERENTE", user);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByTenderIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_OFERTAS_BY_LICITACION_ID_PR" };

            sqlOperation.AddIntParam("P_ID_LICITACION", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByOffererIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_OFERTAS_BY_OFFERER_ID_PR" };

            sqlOperation.AddIntParam("P_ID_OFERENTE", id);

            return sqlOperation;
        }
    }

}

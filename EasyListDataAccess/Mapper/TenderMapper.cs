using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class TenderMapper : ISqlStatements, IObjectMapper
    {

        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var tender = new Tender()
            {
                Id = (int)row["ID_LICITACION"],
                title = (string)row["TITULO"],
                description = (string)row["DESCRIPCION"],
                tenderStatus = (Tender.TenderStatus)Enum.Parse(typeof(Tender.TenderStatus), (string)row["ESTADO"]),
                maxOfferDate = (DateTime)row["FECHAMAXOFERTA"],
                maxDeliverDate = (DateTime)row["FECHAMAXENTREGA"],
                budget = Convert.ToSingle(row["PRESUPUESTO"]),
                QRcode = (string)row["CODIGOQR"],
                automatic = (bool)row["AUTOMATICA"],
                analistId = (int)row["ID_ANALISTA"],
                offerId = row["ID_OFERTA"] == DBNull.Value ? 0 : (int)row["ID_OFERTA"]
            };
            return tender;
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
            var tender = (Tender)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "CRE_LICITACION_PR";
            sqlOperation.AddVarcharParam("P_TITULO", tender.title);
            sqlOperation.AddVarcharParam("P_DESCRIPCION", tender.description);
            sqlOperation.AddVarcharParam("P_ESTADO", tender.tenderStatus.ToString());
            sqlOperation.AddDateTimeParam("P_FECHAMAXOFERTA", tender.maxOfferDate);
            sqlOperation.AddDateTimeParam("P_FECHAMAXENTREGA", tender.maxDeliverDate);
            sqlOperation.AddFloatParam("P_PRESUPUESTO", tender.budget);
            sqlOperation.AddVarcharParam("P_CODIGOQR", tender.QRcode);
            sqlOperation.AddBoolParam("P_AUTOMATICA", tender.automatic);
            sqlOperation.AddIntParam("P_ID_ANALISTA", tender.analistId);
            sqlOperation.AddIntParam("P_ID_OFERTA", tender.offerId);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var tender = (Tender)entity;

            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "UPD_LICITACION_PR";
            sqlOperation.AddIntParam("P_ID_LICITACION", tender.Id);
            sqlOperation.AddVarcharParam("P_TITULO", tender.title);
            sqlOperation.AddVarcharParam("P_DESCRIPCION", tender.description);
            sqlOperation.AddVarcharParam("P_ESTADO", tender.tenderStatus.ToString());
            sqlOperation.AddDateTimeParam("P_FECHAMAXOFERTA", tender.maxOfferDate);
            sqlOperation.AddDateTimeParam("P_FECHAMAXENTREGA", tender.maxDeliverDate);
            sqlOperation.AddFloatParam("P_PRESUPUESTO", tender.budget);
            sqlOperation.AddVarcharParam("P_CODIGOQR", tender.QRcode);
            sqlOperation.AddBoolParam("P_AUTOMATICA", tender.automatic);
            sqlOperation.AddIntParam("P_ID_ANALISTA", tender.analistId);
            sqlOperation.AddIntParam("P_ID_OFERTA", tender.offerId);


            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "DEL_LICITACION_PR" };

            var tender = (Tender)entity;

            sqlOperation.AddIntParam("P_ID_LICITACION", tender.Id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_LICITACION_BY_ID_PR" };

            sqlOperation.AddIntParam("P_ID_LICITACION", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_ALL_LICITACION_PR" };

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }
    }

}

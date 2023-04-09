using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class ProductTenderMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var producttender = new ProductTender()
            {
                product_id = (int)row["ID_PRODUCTO"],
                tender_id = (int)row["ID_LICITACION"],
                quantity = Convert.ToSingle(row["CANTIDAD"]),
                price = Convert.ToSingle(row["PRECIO"])
            };
            return producttender;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newProductTender = BuildObject(row);
                lstResult.Add(newProductTender);
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
            var sqlOperation = new SqlOperation();

            var producttender = (ProductTender)entity;

            sqlOperation.ProcedureName = "CRE_PRODUCTO_LICITACION_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", producttender.product_id);
            sqlOperation.AddIntParam("P_ID_LICITACION", producttender.tender_id);
            sqlOperation.AddFloatParam("P_CANTIDAD", producttender.quantity);
            sqlOperation.AddFloatParam("P_PRECIO", producttender.price);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var producttender = (ProductTender)entity;

            sqlOperation.ProcedureName = "UPD_PRODUCTO_LICITACION_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", producttender.product_id);
            sqlOperation.AddIntParam("P_ID_LICITACION", producttender.tender_id);
            sqlOperation.AddFloatParam("P_CANTIDAD", producttender.quantity);
            sqlOperation.AddFloatParam("P_PRECIO", producttender.price);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var producttender = (ProductTender)entity;

            sqlOperation.ProcedureName = "DEL_PRODUCTO_LICITACION_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", producttender.product_id);
            sqlOperation.AddIntParam("P_ID_LICITACION", producttender.tender_id);

            return sqlOperation;
        }

        public SqlOperation GetDeleteAllStatement(int tender_id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "DEL_ALL_PRODUCTO_LICITACION_PR";
            sqlOperation.AddIntParam("P_ID_LICITACION", tender_id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_ALL_PRODUCTO_LICITACION_PR" };

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_PRODUCTO_LICITACION_BY_ID_PR" };

            sqlOperation.AddIntParam("P_ID_LICITACION", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

    }
}

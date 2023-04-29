using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class ProductOfferMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var productofferta = new ProductOffer()
            {
                product_id = (int)row["ID_PRODUCTO"],
                offer_id = (int)row["ID_OFERTA"],
                quantity = Convert.ToSingle(row["CANTIDAD"]),
                price = Convert.ToSingle(row["PRECIO"]),
                verified = (Boolean)row["COMPROBADO"]
            };
            return productofferta;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newProductOffer = BuildObject(row);
                lstResult.Add(newProductOffer);
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

            var productoffer = (ProductOffer)entity;

            sqlOperation.ProcedureName = "CRE_PRODUCTO_OFERTA_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", productoffer.product_id);
            sqlOperation.AddIntParam("P_ID_OFERTA", productoffer.offer_id);
            sqlOperation.AddFloatParam("P_CANTIDAD", productoffer.quantity);
            sqlOperation.AddFloatParam("P_PRECIO", productoffer.price);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var productoffer = (ProductOffer)entity;

            sqlOperation.ProcedureName = "UPD_PRODUCTO_OFERTA_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", productoffer.product_id);
            sqlOperation.AddIntParam("P_ID_OFERTA", productoffer.offer_id);
            sqlOperation.AddFloatParam("P_CANTIDAD", productoffer.quantity);
            sqlOperation.AddFloatParam("P_PRECIO", productoffer.price);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var productoffer = (ProductOffer)entity;

            sqlOperation.ProcedureName = "DEL_PRODUCTO_OFERTA_PR";
            sqlOperation.AddIntParam("P_ID_PRODUCTO", productoffer.product_id);
            sqlOperation.AddIntParam("P_ID_OFERTA", productoffer.Id);

            return sqlOperation;
        }

        public SqlOperation GetDeleteAllStatement(int offer_id)
        {
            var sqlOperation = new SqlOperation();

            sqlOperation.ProcedureName = "DEL_ALL_PRODUCTO_OFERTA_PR";
            sqlOperation.AddIntParam("P_ID_OFERTA", offer_id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_ALL_PRODUCTO_OFERTA_PR" };

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_PRODUCTO_OFERTA_BY_ID_PR" };

            sqlOperation.AddIntParam("P_ID_OFERTA", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

        internal object GetRetrieveByDateStatement(string startDate, string endDate)
        {
            throw new NotImplementedException();
        }
    }
}

using DTOs;
using EasyListDataAccess.DAOs;

namespace EasyListDataAccess.Mapper
{
    public class InventoryMapper : ISqlStatements, IObjectMapper
    {
        public BaseEntity BuildObject(Dictionary<string, object> row)
        {
            var inventory = new Inventory()
            {
                user_id = (int)row["ID_USUARIO"],
                product_id = (int)row["ID_PRODUCTO"],
                quantity = Convert.ToSingle(row["CANTIDAD"]),
                price = Convert.ToSingle(row["PRECIO"])
            };
            return inventory;
        }

        public List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows)
        {
            var lstResult = new List<BaseEntity>();

            foreach (var row in lstRows)
            {
                var newInventory = BuildObject(row);
                lstResult.Add(newInventory);
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

            var inventory = (Inventory)entity;

            sqlOperation.ProcedureName = "CRE_INVENTARIO_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", inventory.user_id);
            sqlOperation.AddIntParam("P_ID_PRODUCTO", inventory.product_id);
            sqlOperation.AddFloatParam("P_CANTIDAD", inventory.quantity);
            sqlOperation.AddFloatParam("P_PRECIO", inventory.price);

            return sqlOperation;
        }

        public SqlOperation GetUpdateStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var inventory = (Inventory)entity;

            sqlOperation.ProcedureName = "UPD_INVENTARIO_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", inventory.user_id);
            sqlOperation.AddIntParam("P_ID_PRODUCTO", inventory.product_id);
            sqlOperation.AddFloatParam("P_CANTIDAD", inventory.quantity);
            sqlOperation.AddFloatParam("P_PRECIO", inventory.price);

            return sqlOperation;
        }

        public SqlOperation GetDeleteStatement(BaseEntity entity)
        {
            var sqlOperation = new SqlOperation();

            var inventory = (Inventory )entity;

            sqlOperation.ProcedureName = "DEL_INVENTARIO_PR";
            sqlOperation.AddIntParam("P_ID_USUARIO", inventory.user_id);
            sqlOperation.AddIntParam("P_ID_PRODUCTO", inventory.product_id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_ALL_INVENTARIO_PR" };
            
            return sqlOperation;
        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            var sqlOperation = new SqlOperation { ProcedureName = "RET_INVENTARIO_BY_ID_PR " };

            sqlOperation.AddIntParam("P_ID_USUARIO", id);

            return sqlOperation;
        }

        public SqlOperation GetRetrieveByEmailStatement(string email)
        {
            throw new NotImplementedException();
        }

    }

}

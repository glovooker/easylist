using DTOs;
using EasyListDataAccess.DAOs;
using EasyListDataAccess.Mapper;

namespace EasyListDataAccess.CRUD
{
    public class InventoryCrudFactory : CrudFactory
    {
        private InventoryMapper _mapper;
        public InventoryCrudFactory()
        {
            _mapper = new InventoryMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity dto)
        {
            var inventory = (Inventory)dto;
            var sqlOperation = _mapper.GetCreateStatement(inventory);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Update(BaseEntity dto)
        {
            var inventory = (Inventory)dto;
            var sqlOperation = _mapper.GetUpdateStatement(inventory);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override void Delete(BaseEntity dto)
        {
            var inventory = (Inventory)dto;
            var sqlOperation = _mapper.GetDeleteStatement(inventory);
            dao.ExecuteProcedure(sqlOperation);
        }

        public void DeleteAll(int id)
        {
            var sqlOperation = _mapper.GetDeleteAllStatement(id);
            dao.ExecuteProcedure(sqlOperation);
        }

        public override List<Inventory> RetrieveAll<Inventory>()
        {
            var lstInventory = new List<Inventory>();
            var sqlInventory = _mapper.GetRetrieveAllStatement();
            var lstResults = dao.ExecuteQueryProcedure(sqlInventory);

            if (lstResults.Count > 0)
            {
                var objsInventory = _mapper.BuildObjects(lstResults);

                foreach (var op in objsInventory)
                {
                    lstInventory.Add((Inventory)Convert.ChangeType(op, typeof(Inventory)));
                }
            }

            return lstInventory;
        }

        public override T RetrieveByEmail<T>(string email)
        {
            throw new NotImplementedException();
        }

        public List<Inventory> RetrieveByInventoryId<Inventory>(int id)
        {

            var lstInventory = new List<Inventory>();
            var sqlInventory = _mapper.GetRetrieveByIdStatement(id);
            var lstResults = dao.ExecuteQueryProcedure(sqlInventory);

            if (lstResults.Count > 0)
            {
                var objsInventory = _mapper.BuildObjects(lstResults);

                foreach (var op in objsInventory)
                {
                    lstInventory.Add((Inventory)Convert.ChangeType(op, typeof(Inventory)));
                }
            }

            return lstInventory;
        }

        public List<Inventory> RetrieveInventoryByUser<Inventory>(int id)
        {

            var lstInventory = new List<Inventory>();
            var sqlInventory = _mapper.GetRetrieveByUserStatement(id);
            var lstResults = dao.ExecuteQueryProcedure(sqlInventory);

            if (lstResults.Count > 0)
            {
                var objsInventory = _mapper.BuildObjects(lstResults);

                foreach (var op in objsInventory)
                {
                    lstInventory.Add((Inventory)Convert.ChangeType(op, typeof(Inventory)));
                }
            }

            return lstInventory;
        }

        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

    }

}

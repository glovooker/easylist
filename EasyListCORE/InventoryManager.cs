using DTOs;
using EasyListDataAccess.CRUD;

namespace EasyListCORE
{
    public class InventoryManager
    {

        public void Create(Inventory inventory)
        {

            var crudInventory = new InventoryCrudFactory();

            crudInventory.Create(inventory);

        }

        public void Update(Inventory inventory)
        {

            var crudInventory = new InventoryCrudFactory();

            crudInventory.Update(inventory);

        }

        public void Delete(Inventory inventory)
        {

            var crudInventory = new InventoryCrudFactory();

            crudInventory.Delete(inventory);

        }

        public void DeleteAll(int id)
        {

            var crudInventory = new InventoryCrudFactory();

            crudInventory.DeleteAll(id);

        }

        public List<Inventory> RetrieveAll()
        {
            var crudInventory = new InventoryCrudFactory();
            return crudInventory.RetrieveAll<Inventory>();
        }

        public List<Inventory> RetrieveByInventoryId(int id)
        {
            var inventoryFactory = new InventoryCrudFactory();
            return inventoryFactory.RetrieveByInventoryId<Inventory>(id);
        }

        public List<Inventory> RetrieveInventoryByUser(int id)
        {
            var inventoryFactory = new InventoryCrudFactory();
            return inventoryFactory.RetrieveInventoryByUser<Inventory>(id);
        }

    }

}

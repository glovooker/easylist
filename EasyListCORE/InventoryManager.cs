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

        public List<Inventory> RetrieveAll()
        {
            var crudInventory = new InventoryCrudFactory();
            return crudInventory.RetrieveAll<Inventory>();
        }

    }

}

using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : Controller
    {

        [HttpPost]
        [Route("createInventory")]
        public async Task<IActionResult> CreateInventory(Inventory inventory)
        {
            try
            {

                var im = new InventoryManager();
                im.Create(inventory);
                return Ok(inventory);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateInventory")]
        public async Task<IActionResult> UpdateInventory(Inventory inventory)
        {
            try
            {

                var im = new InventoryManager();
                im.Update(inventory);
                return Ok(inventory);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteInventory")]
        public async Task<IActionResult> DeleteInventory(Inventory inventory)
        {
            try
            {

                var im = new InventoryManager();
                im.Delete(inventory);
                return Ok(inventory);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteAllInventory")]
        public async Task<IActionResult> DeleteAllInventory(int id)
        {
            try
            {

                var im = new InventoryManager();
                im.DeleteAll(id);
                return Ok(id);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveAllInventory")]
        public async Task<IActionResult> RetrieveAllInventory()
        {
            try
            {

                var im = new InventoryManager();
                return Ok(im.RetrieveAll());

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveInventory")]
        public async Task<IActionResult> RetrieveInventory(int id)
        {
            try
            {

                var im = new InventoryManager();
                var inventory = im.RetrieveByInventoryId(id);
                return Ok(inventory);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}

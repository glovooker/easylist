using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpPost]
        [Route("createProduct")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            try
            {
                var um = new ProductManager();
                um.Create(product);
                return Ok("The product " + product.name + " has been successfully added.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getProductById")]
        public async Task<IActionResult> RetrieveProductById(int id)
        {
            try
            {
                var um = new ProductManager();
                var product = um.RetrieveById(id);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getAllProducts")]
        public async Task<IActionResult> RetrieveAllProduct()
        {
            try
            {
                var um = new ProductManager();
                var products = um.RetrieveAll();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteProduct")]
        public async Task<IActionResult> DeleteProduct(Product product)
        {
            try
            {
                var um = new ProductManager();
                um.Delete(product);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

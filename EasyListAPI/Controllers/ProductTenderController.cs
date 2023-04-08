using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class ProductTenderController : Controller
    {

        [HttpPost]
        [Route("createProductTender")]
        public async Task<IActionResult> CreateProductTender(ProductTender producttender)
        {
            try
            {

                var ptm = new ProductTenderManager();
                ptm.Create(producttender);
                return Ok("The tender product has been successfully added.");

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateProductTender")]
        public async Task<IActionResult> UpdateProductTender(ProductTender producttender)
        {
            try
            {

                var ptm = new ProductTenderManager();
                ptm.Update(producttender);
                return Ok("The tender product has been successfully update.");

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteProductTender")]
        public async Task<IActionResult> DeleteProductTender(ProductTender producttender)
        {
            try
            {

                var ptm = new ProductTenderManager();
                ptm.Delete(producttender);
                return Ok(producttender);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveAllProductTenders")]
        public async Task<IActionResult> RetrieveAllProductTenders()
        {
            try
            {

                var ptm = new ProductTenderManager();
                return Ok(ptm.RetrieveAll());

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveProductTenders")]
        public async Task<IActionResult> RetrieveProducTenders(int id)
        {
            try
            {

                var ptm = new ProductTenderManager();
                var producttender = ptm.RetrieveByTenderId(id);
                return Ok(producttender);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

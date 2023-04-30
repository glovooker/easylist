using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class ProductOfferController : Controller
    {

        [HttpPost]
        [Route("createProductOffer")]
        public async Task<IActionResult> CreateProductOffer(ProductOffer productoffer)
        {
            try
            {

                var ptm = new ProductOfferManager();
                ptm.Create(productoffer);
                return Ok("The offer product has been successfully added.");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateProductOffer")]
        public async Task<IActionResult> UpdateProductOffer(ProductOffer productoffer)
        {
            try
            {

                var ptm = new ProductOfferManager();
                ptm.Update(productoffer);
                return Ok("The offer product has been successfully update.");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteProductOffer")]
        public async Task<IActionResult> DeleteProductOffer(ProductOffer productoffer)
        {
            try
            {

                var ptm = new ProductOfferManager();
                ptm.Delete(productoffer);
                return Ok(productoffer);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteAllProductOffer")]
        public async Task<IActionResult> DeleteAllProductOffer(int offer_id)
        {
            try
            {

                var ptm = new ProductOfferManager();
                ptm.DeleteAll(offer_id);
                return Ok(offer_id);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveAllProductOffers")]
        public async Task<IActionResult> RetrieveAllProductOffers()
        {
            try
            {

                var ptm = new ProductOfferManager();
                return Ok(ptm.RetrieveAll());

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveProductOffers")]
        public async Task<IActionResult> RetrieveProducTenders(int id)
        {
            try
            {

                var ptm = new ProductOfferManager();
                var productoffer = ptm.RetrieveByOfferId(id);
                return Ok(productoffer);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

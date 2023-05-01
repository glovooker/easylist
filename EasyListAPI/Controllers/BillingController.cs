using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : Controller
    {
        [HttpPost]
        [Route("createBilling")]
        public async Task<IActionResult> CreateBilling(Billing billing)
        {
            try
            {
                var mm = new BillingManager();
                mm.Create(billing);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveBillingById")]
        public async Task<IActionResult> RetrieveBillingById(int id)
        {
            try
            {
                var mm = new BillingManager();
                var billing = mm.RetrieveById(id);
                return Ok(billing);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

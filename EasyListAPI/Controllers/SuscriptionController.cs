using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuscriptionController : Controller
    {
        [HttpPost]
        [Route("createSuscription")]
        public async Task<IActionResult> CreateSuscription(Suscription suscription)
        {
            try
            {
                var mm = new SuscriptionManager();
                mm.Create(suscription);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveSuscriptionById")]
        public async Task<IActionResult> RetrieveSuscriptionById(int id)
        {
            try
            {
                var mm = new SuscriptionManager();
                var suscription = mm.RetrieveById(id);
                return Ok(suscription);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveAllSuscription")]
        public async Task<IActionResult> RetrieveAllSuscription()
        {
            try
            {
                var mm = new SuscriptionManager();
                var suscriptions = mm.RetrieveAll();
                return Ok(suscriptions);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateSuscription")]
        public async Task<IActionResult> UpdateSuscription(Suscription suscription)
        {
            try
            {
                var mm = new SuscriptionManager();
                mm.Update(suscription);
                return Ok(suscription);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteSuscription")]
        public async Task<IActionResult> DeleteSuscription(Suscription suscription)
        {
            try
            {
                var mm = new SuscriptionManager();
                mm.Delete(suscription);
                return Ok(suscription);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

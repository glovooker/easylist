using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinnacleController : ControllerBase
    {

        [HttpPost]
        [Route("createBinnacle")]
        public async Task<IActionResult> CreateBinnacle(Binnacle binnacle)
        {
            try
            {

                var bm = new BinnacleManager();

                bm.Create(binnacle);

                return Ok();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveBinnacleById")]
        public async Task<IActionResult> RetrieveBinnacleById(int id)
        {
            try
            {

                var bm = new BinnacleManager();

                var binnacle = bm.RetrieveById(id);

                return Ok(binnacle);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }

        [HttpGet]
        [Route("retrieveAllBinnacles")]
        public async Task<IActionResult> RetrieveAllBinacle()
        {
            try
            {

                var bm = new BinnacleManager();

                return Ok(bm.RetrieveAll());

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}

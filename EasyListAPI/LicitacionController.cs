using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class LicitacionController : ControllerBase
    {

        //Create de la Licitacion

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create(Licitacion licitacion)
        {
            try
            {

                var pm = new LicitacionManager();

                pm.Create(licitacion);

                return Ok(pm);

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }

}

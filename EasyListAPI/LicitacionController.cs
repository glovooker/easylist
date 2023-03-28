using DTOs;
using EasyListCORE;
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

                return Ok();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //Update de la Licitacion

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update(Licitacion licitacion)
        {
            try
            {
                var pm = new LicitacionManager();

                pm.Update(licitacion);

                return Ok();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //RetrieveById de la Licitacion

        [HttpGet]
        [Route("RetrieveLicitacionById")]
        public async Task<IActionResult> RetrieveLicitacionById(int idLicitacion)
        {
            try
            {

                var pm = new LicitacionManager();

                var licitacion = pm.RetrieveById(idLicitacion);

                return Ok(licitacion);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //RetrieveAll de la Licitacion

        [HttpGet]
        [Route("RetrieveAllLicitacion")]
        public async Task<IActionResult> RetrieveAllLicitacion()
        {
            try
            {
                var cm = new LicitacionManager();

                return Ok(cm.RetrieveAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

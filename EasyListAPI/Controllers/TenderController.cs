using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenderController : ControllerBase
    {

        [HttpPost]
        [Route("createTender")]
        public async Task<IActionResult> CreateTender(Tender tender)
        {
            try
            {

                var tm = new TenderManager();

                tm.Create(tender);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("updateTender")]
        public async Task<IActionResult> UpdateTender(Tender tender)
        {
            try
            {

                var tm = new TenderManager();

                tm.Update(tender);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteTender")]
        public async Task<IActionResult> DeleteTender(Tender tender)
        {
            try
            {

                var tm = new TenderManager();

                tm.Delete(tender);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveTenderById")]
        public async Task<IActionResult> RetrieveTenderById(int id)
        {
            try
            {

                var tm = new TenderManager();

                var tender = tm.RetrieveById(id);

                return Ok(tender);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        [Route("retrieveAllTenders")]
        public async Task<IActionResult> RetrieveAllTenders()
        {
            try
            {
                var tm = new TenderManager();

                return Ok(tm.RetrieveAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getTendersByDate")]
        public async Task<IActionResult> RetrieveTendersByDate(string startDate, string endDate)
        {
            try
            {
                var um = new TenderManager();
                var tenders = um.RetrieveByDate(startDate, endDate);
                return Ok(tenders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

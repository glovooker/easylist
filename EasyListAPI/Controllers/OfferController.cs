using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {

        [HttpPost]
        [Route("createOffer")]
        public async Task<IActionResult> CreateOffer(Offer offer)
        {
            try
            {

                var tm = new OfferManager();

                tm.Create(offer);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("updateOffer")]
        public async Task<IActionResult> UpdateOffer(Offer offer)
        {
            try
            {

                var tm = new OfferManager();

                tm.Update(offer);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteOffer")]
        public async Task<IActionResult> DeleteOffer(Offer offer)
        {
            try
            {

                var tm = new OfferManager();

                tm.Delete(offer);

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveOfferById")]
        public async Task<IActionResult> RetrieveOfferById(int id)
        {
            try
            {

                var tm = new OfferManager();

                var offer = tm.RetrieveById(id);

                return Ok(offer);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        [Route("retrieveAllOffers")]
        public async Task<IActionResult> RetrieveAllOffers()
        {
            try
            {
                var tm = new OfferManager();

                return Ok(tm.RetrieveAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getOffersByDate")]
        public async Task<IActionResult> RetrieveOffersByDate(string startDate, string endDate)
        {
            try
            {
                var um = new OfferManager();
                var tenders = um.RetrieveByDate(startDate, endDate);
                return Ok(tenders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("checkUserOffer")]
        public async Task<IActionResult> CheckUserOffer(int user, int tender)
        {
            try
            {
                var om = new OfferManager();
                var offer = om.CheckUserOffer(user, tender);
                return Ok(offer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveOffersByTenderId")]
        public async Task<IActionResult> retrieveOffersByTenderId(int id)
        {
            try
            {

                var om = new OfferManager();

                var offer = om.RetrieveByTenderId(id);

                return Ok(offer);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        [Route("retrieveOffersByOffererId")]
        public async Task<IActionResult> retrieveOffersByOffererId(int id)
        {
            try
            {

                var om = new OfferManager();

                var offer = om.RetrieveByOffererId(id);

                return Ok(offer);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}

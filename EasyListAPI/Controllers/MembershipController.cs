using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        [HttpPost]
        [Route("createMembership")]
        public async Task<IActionResult> CreateMembership(Membership membership)
        {
            try
            {
                var mm = new MembershipManager();
                mm.Create(membership);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveMembershipById")]
        public async Task<IActionResult> RetrieveMembershipById(int id)
        {
            try
            {
                var mm = new MembershipManager();
                var membership=mm.RetrieveById(id);
                return Ok(membership);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("retrieveAllMembership")]
        public async Task<IActionResult> RetrieveAllMembership()
        {
            try
            {
                var mm = new MembershipManager();
                var memberships = mm.RetrieveAll();
                return Ok(memberships);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateMembership")]
        public async Task<IActionResult> UpdateMembership(Membership membership)
        {
            try
            {
                var mm = new MembershipManager();
                mm.Update(membership);
                return Ok(membership);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deleteMembership")]
        public async Task<IActionResult> DeleteMembership(Membership membership)
        {
            try
            {
                var mm = new MembershipManager();
                mm.Delete(membership);
                return Ok(membership);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        [HttpPost]
        [Route("createPassword")]
        public async Task<IActionResult> CreatePassword(Password password)
        {
            try
            {
                var pm = new PasswordManager();
                pm.Create(password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getPasswordByUserId")]
        public async Task<IActionResult> RetrievePasswordByUserId(int id)
        {
            try
            {
                var pm = new PasswordManager();
                var password = pm.RetrieveByUserId(id);
                return Ok(password);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getPasswordByUserEmail")]
        public async Task<IActionResult> RetrievePasswordByUserEmail(string email)
        {
            try
            {
                var pm = new PasswordManager();
                var password = pm.RetrieveByUserEmail(email);
                return Ok(password);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
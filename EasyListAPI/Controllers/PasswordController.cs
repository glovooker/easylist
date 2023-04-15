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
        [Route("getPasswordByEmail")]
        public async Task<IActionResult> RetrievePasswordByEmail(string email)
        {
            try
            {
                var pm = new PasswordManager();
                var password = pm.RetrieveByEmail(email);
                return Ok(password);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getLastFivePasswordsByUser")]
        public async Task<IActionResult> RetrieveLastFivePasswordsByUser(int id)
        {
            try
            {
                var pm = new PasswordManager();
                var passwords = pm.RetrieveLastFive(id);
                return Ok(passwords);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updatePassword")]
        public async Task<IActionResult> UpdatePassword(Password password)
        {
            try
            {
                var pm = new PasswordManager();
                pm.Update(password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("deletePassword")]
        public async Task<IActionResult> DeletePassword(Password password)
        {
            try
            {
                var pm = new PasswordManager();
                pm.Delete(password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getEncryptedPassword")]
        public async Task<IActionResult> GetEncryptedPassword(string password)
        {
            try
            {
                var pm = new PasswordManager();
                var encryptedPassword = pm.GetEncryptedPassword(password);
                return Ok(encryptedPassword);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidationController : ControllerBase
    {
        [HttpPost]
        [Route("createValidation")]

        public async Task<IActionResult> CreateValidation(Validation validation)
        {
            try
            {
                var vm = new ValidationManager();
                vm.Create(validation);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }       

    }
}

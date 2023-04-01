using DTOs;
using EasyListCORE;
using Microsoft.AspNetCore.Mvc;
using System.Security;

namespace EasyListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagePermissionController : ControllerBase
    {

        [HttpPost]
        [Route("checkPermission")]
        public async Task<IActionResult> CheckPermission(ManagePermission managepermission)
        {
            var checkResult = true;

            var um = new ManagePermissionManager();

            var retrievedPermission = um.Check(managepermission);

            if (retrievedPermission == null)
            {
                return NoContent();
            }

            return Ok(retrievedPermission);
        }

    }
}

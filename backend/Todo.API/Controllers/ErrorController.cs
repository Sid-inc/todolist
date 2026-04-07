using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Todo.API.Controllers;

[ApiController]
[ApiExplorerSettings(IgnoreApi = true)]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult Error()
    {
        var exception = HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;
        
        if (exception is null)
            return StatusCode(500);

        return exception switch
        {
            ValidationException validation => BadRequest(new { error = validation.Message, errors = validation.Value }),
            ArgumentException argEx => BadRequest(new { error = argEx.Message }),
            _ => StatusCode(500, new { error = "Internal server error." })
        };
    }
}
using MicroCuentas.Application.Service;
using MicroCuentas.Domain.Entities;
using MicroCuentas.Infrastructure;
using MicroCuentas.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;


namespace MicroCuentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovimientosController : ControllerBase
    {
        private readonly MicroContext db;

        public MovimientosController(MicroContext _db)
        {
            this.db = _db;
        }

        private MovimientoService CreateService()
        {
            MovimientoRepository repository = new MovimientoRepository(db);
            MovimientoService service = new MovimientoService(repository);
            return service;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = CreateService().ListEntity();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var service = CreateService();
                var result = await service.GetEntityById(id);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { statusCode = 500, message = ex.Message });
            }
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Add([FromBody] Movimiento request)
        {
            var cliente = await CreateService().AddEntity(request);
            return CreatedAtAction(nameof(GetById), new { id = cliente.id }, cliente);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Movimiento request)
        {
            try
            {
                await CreateService().EditEntity(request);
                return Ok("Registro actualizado exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { statusCode = 500, message = ex.Message });
            }

        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                CreateService().Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { statusCode = 500, message = ex.Message });
            }
        }
    }
}

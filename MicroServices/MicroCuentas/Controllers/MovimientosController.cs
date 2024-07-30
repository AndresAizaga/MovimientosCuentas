using MicroCuentas.Application.Service;
using MicroCuentas.Controllers.Input;
using MicroCuentas.Controllers.Output;
using MicroCuentas.Domain.Entities;
using MicroCuentas.Infrastructure;
using MicroCuentas.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Extensions;
using System.Runtime.CompilerServices;


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

        private CuentaService CreateCuentaService()
        {
            CuentaRepository repository = new CuentaRepository(db);
            CuentaService service = new CuentaService(repository);
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
        public async Task<IActionResult> Add([FromBody] MovimientoRequest request)
        {
            var movimientos = await CreateService().GetByCuentaId(request.cuentaId);
            double saldo = CreateCuentaService().GetEntityById(request.cuentaId).Result.saldoInicial;
            if (movimientos != null && movimientos.Count > 0)
                saldo = movimientos.OrderByDescending(x => x.fecha).ToList()[0].saldo;

            if (request.tipoMovimiento.Equals(TipoMovimiento.Debito))
            {
                if ((saldo + request.valor) < 0)
                {
                    return StatusCode(StatusCodes.Status406NotAcceptable, new { statusCode = 406, message = "Saldo insuficiente en la cuenta." });
                }
            }
            var result = CreateService().AddEntity(new Movimiento
            {
                cuentaId = request.cuentaId,
                fecha = DateTime.Now,
                saldo = saldo + request.valor,
                tipoMovimiento = request.tipoMovimiento.GetDisplayName(),
                valor = request.valor,
            });

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
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

        [HttpGet]
        [Route("reportes")]
        public async Task<IActionResult> Reportes(DateTime fechaDesde, DateTime fechaHasta)
        {
            try
            {
                var movimientos = await CreateService().GetByFechas(fechaDesde, fechaHasta);
                List<MovimientoOutput> result = new List<MovimientoOutput>();
                
                foreach (var movimiento in movimientos)
                {
                    var cuenta = await CreateCuentaService().GetEntityById(movimiento.cuentaId);
                    result.Add(new MovimientoOutput
                    {
                        cliente = cuenta.cliente.persona.nombre,
                        estado = cuenta.estado,
                        fecha = movimiento.fecha,
                        movimiento = movimiento.valor,
                        numeroCuenta = cuenta.numeroCuenta,
                        saldoInicial = cuenta.saldoInicial,
                        saldoDisponible = movimiento.saldo,
                        tipoCuenta = cuenta.tipoCuenta
                    });
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { statusCode = 500, message = ex.Message });
            }
        }
    }
}

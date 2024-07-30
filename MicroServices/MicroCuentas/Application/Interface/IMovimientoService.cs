using MicroCuentas.Domain.Entities;
using MicroCuentas.Domain.Repository;

namespace MicroCuentas.Application.Interface
{
    public interface IMovimientoService<TEntity, TEntityId>
        : IRepositoryBase<TEntity, TEntityId>
    {
        Task<List<Movimiento>> GetByCuentaId(int cuentaId);
        Task<List<Movimiento>> GetByFechas(DateTime fechaDesde, DateTime fechaHasta);
    }
}

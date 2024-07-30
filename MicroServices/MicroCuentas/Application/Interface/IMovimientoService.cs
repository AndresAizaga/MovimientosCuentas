using MicroCuentas.Domain.Repository;

namespace MicroCuentas.Application.Interface
{
    public interface IMovimientoService<TEntity, TEntityId>
        : IRepositoryBase<TEntity, TEntityId>
    {
    }
}

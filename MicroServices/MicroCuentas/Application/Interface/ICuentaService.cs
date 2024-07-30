using MicroCuentas.Domain.Repository;

namespace MicroCuentas.Application.Interface
{
    public interface ICuentaService<TEntity, TEntityId>
        : IRepositoryBase<TEntity, TEntityId>
    {
    }
}

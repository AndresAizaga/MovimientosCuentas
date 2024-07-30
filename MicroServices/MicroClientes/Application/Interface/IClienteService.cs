using MicroClientes.Domain.Repository;

namespace MicroClientes.Application.Interface
{
    public interface IClienteService<TEntity, TEntityId>
        : IRepositoryBase<TEntity, TEntityId>
    {
    }
}

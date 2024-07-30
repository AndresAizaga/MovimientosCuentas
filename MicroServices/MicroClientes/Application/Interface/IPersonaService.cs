using MicroClientes.Domain.Repository;

namespace MicroClientes.Application.Interface
{
    public interface IPersonaService<TEntity, TEntityId>
        : IRepositoryBase<TEntity, TEntityId>
    {
    }
}

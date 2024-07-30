using MicroClientes.Domain.Repository.Interface;

namespace MicroClientes.Domain.Repository
{
    public interface IRepositoryBase<TEntity, TEntityId>
      : IAdd<TEntity>, IEdit<TEntity>, IDelete<TEntityId>, IList<TEntity, TEntityId>
    {
    }
}

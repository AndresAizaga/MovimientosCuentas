using MicroCuentas.Domain.Repository.Interface;

namespace MicroCuentas.Domain.Repository
{
    public interface IRepositoryBase<TEntity, TEntityId>
      : IAdd<TEntity>, IEdit<TEntity>, IDelete<TEntityId>, IList<TEntity, TEntityId>
    {
    }
}

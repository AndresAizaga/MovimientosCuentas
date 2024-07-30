namespace MicroCuentas.Domain.Repository.Interface
{
    public interface IList<TEntity, TEntityId>
    {
        int Count { get; }
        Task<List<TEntity>> ListEntity();
        Task<TEntity>? GetEntityById(TEntityId entityId);
    }
}

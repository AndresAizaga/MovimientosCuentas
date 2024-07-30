namespace MicroClientes.Domain.Repository.Interface
{
    public interface IList<TEntity, TEntityId>
    {
        int Count { get; }
        List<TEntity> ListEntity();
        TEntity? GetEntityById(TEntityId entityId);
    }
}

namespace MicroClientes.Domain.Repository.Interface
{
    public interface IEdit<TEntity>
    {
        Task EditEntity(TEntity entity);
    }
}

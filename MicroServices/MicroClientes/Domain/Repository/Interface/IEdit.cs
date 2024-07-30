namespace MicroClientes.Domain.Repository.Interface
{
    public interface IEdit<TEntity>
    {
        void EditEntity(TEntity entity);
    }
}

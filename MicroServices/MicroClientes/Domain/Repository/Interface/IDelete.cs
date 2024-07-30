namespace MicroClientes.Domain.Repository.Interface
{
    public interface IDelete<TEntityId>
    {
        void Delete(TEntityId entityId);
    }
}

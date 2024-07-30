namespace MicroClientes.Domain.Repository.Interface
{
    public interface IAdd<TEntidad>
    {
        Task<TEntidad> AddEntity(TEntidad entity);
    }
}

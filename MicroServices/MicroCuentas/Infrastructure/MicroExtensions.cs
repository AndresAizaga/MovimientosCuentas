using Microsoft.EntityFrameworkCore;

namespace MicroCuentas.Infrastructure
{
    public static class MicroExtensions
    {
        public static void ConfigureDB(this IServiceCollection services, IConfiguration configuration)
        {
            Console.WriteLine("[ConfigureDB] CONFIGURANDO CONEXION A LA BASE DE DATOS");
            string? connectionDB = configuration.GetConnectionString(name: "ConnectionString");
            Console.WriteLine(connectionDB);
            services.AddDbContext<MicroContext>(options => options.UseSqlServer(connectionDB));
        }
    }
}

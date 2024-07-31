using MicroClientes.Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Integration.Tests
{
    internal class MicroservicesWebApplicationFactory : WebApplicationFactory<Program>
    {
        override protected void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                // Remove the existing DbContextOptions
                services.RemoveAll(typeof(DbContextOptions<MicroContext>));

                // Register a new DBContext that will use our test connection string
                string? connString = GetConnectionString();
                services.AddSqlServer<MicroContext>(connString);

                // Delete the database (if exists) to ensure we start clean
                //MicroContext dbContext = CreateDbContext(services);
                //dbContext.Database.EnsureDeleted();
            });
        }

        private static string? GetConnectionString()
        {
            var configuration = new ConfigurationBuilder()
                .AddUserSecrets<MicroservicesWebApplicationFactory>()
                .Build();

            var connString = "Server=localhost;Initial Catalog=BancoPichincha;Integrated Security=True;TrustServerCertificate=True;Connection Timeout=30;MultipleActiveResultSets=true"; // configuration.GetConnectionString("ConnectionString");
            return connString;
        }

        private static MicroContext CreateDbContext(IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();
            var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<MicroContext>();
            return dbContext;
        }
    }
}

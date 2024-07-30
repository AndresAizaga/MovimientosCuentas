using MicroClientes.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace MicroClientes.Infrastructure.Configs
{
    public class PersonaConfig : IEntityTypeConfiguration<Persona>
    {
        public void Configure(EntityTypeBuilder<Persona> builder)
        {
            builder.ToTable("Persona");
            builder.HasKey(x => x.id);
            builder.Property(x => x.id).HasColumnName("id");
            builder.Property(x => x.nombre).HasColumnName("nombre");
            builder.Property(x => x.genero).HasColumnName("genero");
            builder.Property(x => x.edad).HasColumnName("edad");
            builder.Property(x => x.identificacion).HasColumnName("identificacion");
            builder.Property(x => x.direccion).HasColumnName("direccion");
            builder.Property(x => x.telefono).HasColumnName("telefono");
        }
    }
}

namespace MicroCuentas.Domain.Entities
{
    public class Cuenta
    {
        public int id { get; set; }
        public int clienteId { get; set; }
        public string numeroCuenta { get; set; }
        public string tipoCuenta { get; set; }
        public double saldoInicial { get; set; }
        public bool estado { get; set; }
        public Cliente? cliente { get; set; }

    }
    public class Cliente
    {
        public int id { get; set; }
        public string password { get; set; }
        public bool estado { get; set; }
        public int personaId { get; set; }
        public Persona? persona { get; set; }
    }

    public class Persona
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public int edad { get; set; }
        public string genero { get; set; }
        public string identificacion { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
    }
}

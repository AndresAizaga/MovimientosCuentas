namespace MicroCuentas.Controllers.Output
{
    public class MovimientoOutput
    {
        public DateTime fecha {  get; set; }
        public string cliente { get; set; }
        public string numeroCuenta { get; set; }
        public string tipoCuenta { get; set; }
        public double saldoInicial { get; set; }
        public bool estado { get; set; }
        public double movimiento {  get; set; }
        public double saldoDisponible { get; set; }
    }
}

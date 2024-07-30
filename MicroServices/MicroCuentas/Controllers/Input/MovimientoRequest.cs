namespace MicroCuentas.Controllers.Input
{
    public class MovimientoRequest
    {
        public TipoMovimiento tipoMovimiento { get; set; }
        public double valor { get; set; }
        public int cuentaId { get; set; }
    }
    public enum TipoMovimiento
    {
        Debito = 0,
        Credito = 1,
    }
}

namespace Garnet.Libs.PaymentDomain.ValueObjects;

public record Currency(string Code)
{
    public static readonly Currency GEL = new("GEL");
    public static readonly Currency USD = new("USD");
    public static readonly Currency EUR = new("EUR");
}

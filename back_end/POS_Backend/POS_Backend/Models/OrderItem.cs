namespace POS_Backend.Models
{
    public class OrderItem
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public virtual Order? Order { get; set; }
    }
}

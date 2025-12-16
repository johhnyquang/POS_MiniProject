namespace POS_Backend.DTOs.OrderItemDTO
{
    public class OrderItemResponse
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; } = 0;
        public int Quantity { get; set; } = 0;
        public decimal TotalPrice { get; set; } = 0;
    }
}

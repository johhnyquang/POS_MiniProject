namespace POS_Backend.DTOs.OrderItemDTO
{
    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; } = 0;
        public decimal Price { get; set; }  
    }
}

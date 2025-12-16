using POS_Backend.DTOs.OrderItemDTO;

namespace POS_Backend.DTOs.OrderDTO
{
    public class OrderResponse
    {
        public int OrderId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; } = 0;
        public List<OrderItemResponse> OrderItems { get; set; } = new List<OrderItemResponse>();
    }
}

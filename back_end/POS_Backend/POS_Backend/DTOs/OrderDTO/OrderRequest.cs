using POS_Backend.DTOs.OrderItemDTO;

namespace POS_Backend.DTOs.OrderDTO
{
    public class OrderRequest
    {
        public List<OrderItemRequest> OrderItems { get; set; } = new List<OrderItemRequest>();
    }
}

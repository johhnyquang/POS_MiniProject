using POS_Backend.DTOs;
using POS_Backend.DTOs.OrderDTO;

namespace POS_Backend.Services.OrderService
{
    public interface IOrderService
    {
        public ServiceResponseDTO<List<OrderResponse>> GetAllOrders();
        public Task<ServiceResponseDTO<bool>> CreateOrder(OrderRequest orderRequest);
    }
}

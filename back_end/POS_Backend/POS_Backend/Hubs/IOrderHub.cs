using POS_Backend.DTOs.OrderDTO;
using POS_Backend.Models;

namespace POS_Backend.Hubs
{
    public interface IOrderHub
    {
        public Task NotifyNewOrder(OrderResponse order);
    }
}

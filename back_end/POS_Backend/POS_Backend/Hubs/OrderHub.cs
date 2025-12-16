using Microsoft.AspNetCore.SignalR;
using POS_Backend.DTOs.OrderDTO;
using POS_Backend.Models;

namespace POS_Backend.Hubs
{
    public class OrderHub : Hub<IOrderHub>
    {
    }
}

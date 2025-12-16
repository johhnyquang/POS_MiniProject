using Microsoft.AspNetCore.SignalR;
using POS_Backend.DTOs;
using POS_Backend.DTOs.OrderDTO;
using POS_Backend.DTOs.OrderItemDTO;
using POS_Backend.Hubs;
using POS_Backend.Models;
using System.Threading.Tasks;

namespace POS_Backend.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IHubContext<OrderHub, IOrderHub> _hubContext;

        public OrderService(IHubContext<OrderHub, IOrderHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task<ServiceResponseDTO<bool>> CreateOrder(OrderRequest orderRequest)
        {
            int newOrderId = Data.SeedData.Orders.Count > 0 ? Data.SeedData.Orders.Max(o => o.OrderId) : 0;
            newOrderId = ++ newOrderId;

            var order = new Order
            {
                OrderId = newOrderId,
                OrderDate = DateTime.Now,
                OrderItems = orderRequest.OrderItems.Select(oi => new OrderItem
                {
                    OrderId = newOrderId,
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.Price
                }).ToList(),
                TotalAmount = orderRequest.OrderItems.Sum(oi => oi.Price * oi.Quantity)
            };

            Data.SeedData.Orders.Add(order);

            // Notify 
            try
            {
                var notificationOrder = new OrderResponse
                {
                    OrderId = order.OrderId,
                    OrderDate = order.OrderDate,
                    TotalAmount = order.TotalAmount
                };
                await _hubContext.Clients.All.NotifyNewOrder("New order created", notificationOrder);
                return new ServiceResponseDTO<bool>
                {
                    Data = true,
                    Success = true,
                    Message = "Order created and notification sent successfully."
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponseDTO<bool>
                {
                    Data = true,
                    Success = false,
                    Message = $"Order created but failed to notify: {ex.Message}"
                };
            }
        }

        public ServiceResponseDTO<List<OrderResponse>> GetAllOrders()
        {
            //throw new NotImplementedException();
            //var result = Data.SeedData.Orders.Select(o => new OrderResponse
            //{
            //    OrderId = o.OrderId,
            //    OrderDate = o.OrderDate,
            //    TotalAmount = o.TotalAmount,
            //    OrderItems = o.OrderItems.Select(oi => new DTOs.OrderItemDTO.OrderItemResponse
            //    {
            //        OrderId = oi.OrderId,
            //        ProductId = oi.ProductId,
            //        ProductName = oi.ProductName,
            //        ProductPrice = oi.UnitPrice ,
            //        Quantity = oi.Quantity,
            //        TotalPrice = oi.Quantity * oi.UnitPrice
            //    }).ToList()
            //}).OrderByDescending(o => o.OrderDate).ToList();
            //return new ServiceResponseDTO<List<OrderResponse>>
            //{
            //    Data = result,
            //    Success = true,
            //    Message = "Orders retrieved successfully."
            //};

            var result = Data.SeedData.Orders.OrderByDescending(o => o.OrderDate).AsEnumerable();
            var orderResponses = new List<OrderResponse>(result.Count());
            foreach (var item in result)
            {
                var orderResponse = new OrderResponse
                {
                    OrderId = item.OrderId,
                    OrderDate = item.OrderDate,
                    TotalAmount = item.TotalAmount,
                    OrderItems = new List<OrderItemResponse>(item.OrderItems.Count)
                };

                foreach (var orderItem in item.OrderItems)
                {
                   orderResponse.OrderItems.Add(new OrderItemResponse
                   {
                        OrderId = orderItem.OrderId,
                        ProductId = orderItem.ProductId,
                        ProductName = orderItem.ProductName,
                        ProductPrice = orderItem.UnitPrice,
                        Quantity = orderItem.Quantity,
                        TotalPrice = orderItem.Quantity * orderItem.UnitPrice
                   });
                }

                orderResponses.Add(orderResponse);
            }

            return new ServiceResponseDTO<List<OrderResponse>>
            {
                Data = orderResponses,
                Success = true,
                Message = "Orders retrieved successfully."
            };
        }
    }
}

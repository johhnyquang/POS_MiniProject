using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_Backend.DTOs;
using POS_Backend.DTOs.OrderDTO;
using POS_Backend.Services.OrderService;

namespace POS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public ActionResult<ServiceResponseDTO<List<OrderResponse>>> Get()
        {
            var response = _orderService.GetAllOrders();
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody]OrderRequest orderRequest)
        {
            var response = await _orderService.CreateOrder(orderRequest);
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}

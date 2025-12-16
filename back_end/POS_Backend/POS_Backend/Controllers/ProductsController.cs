using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_Backend.DTOs;
using POS_Backend.DTOs.ProductDTO;
using POS_Backend.Services.ProductService;

namespace POS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public ActionResult<ServiceResponseDTO<List<ProductResponse>>> Get()
        {
            var response = _productService.GetAllProduct();
            if (response.Success)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }
    }
}

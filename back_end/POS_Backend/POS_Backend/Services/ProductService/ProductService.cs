using POS_Backend.DTOs;
using POS_Backend.DTOs.ProductDTO;

namespace POS_Backend.Services.ProductService
{
    public class ProductService : IProductService
    {
        public ProductService() { }
        public ServiceResponseDTO<List<ProductResponse>> GetAllProduct()
        {
            var result = Data.SeedData.Products.Select(p => new ProductResponse
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                Price = p.Price,
                ImageUrl = p.ImageUrl

            }).ToList();

            return new ServiceResponseDTO<List<ProductResponse>>
            {
                Data = result,
                Success = true,
                Message = "Products retrieved successfully."
            };
        }
    }
}

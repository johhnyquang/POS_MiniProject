using POS_Backend.DTOs;
using POS_Backend.DTOs.ProductDTO;

namespace POS_Backend.Services.ProductService
{
    public interface IProductService
    {
        public ServiceResponseDTO<List<ProductResponse>> GetAllProduct();
    }
}

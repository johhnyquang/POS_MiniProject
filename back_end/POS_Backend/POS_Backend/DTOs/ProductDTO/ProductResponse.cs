namespace POS_Backend.DTOs.ProductDTO
{
    public class ProductResponse
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}

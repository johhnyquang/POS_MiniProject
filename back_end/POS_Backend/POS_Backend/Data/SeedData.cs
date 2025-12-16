using POS_Backend.Models;

namespace POS_Backend.Data
{
    public static class SeedData
    {
        public static List<Product> Products = new List<Product>
        {
            new Product { ProductId = 1, ProductName = "Cà phê sữa đá", Price = 25000 },
            new Product { ProductId = 2, ProductName = "Trà sữa trân châu", Price = 35000 },
            new Product { ProductId = 3, ProductName = "Bánh mì pate", Price = 20000 },
            new Product { ProductId = 4, ProductName = "Sinh tố dâu", Price = 40000 },
            new Product { ProductId = 5, ProductName = "Nước suối", Price = 10000 },
            new Product { ProductId = 6, ProductName = "Bánh ngọt", Price = 30000 },
            new Product { ProductId = 7, ProductName = "Cơm tấm", Price = 45000 },
            new Product { ProductId = 8, ProductName = "Phở bò", Price = 50000 },
            new Product { ProductId = 9, ProductName = "Gỏi cuốn", Price = 15000 },
            new Product { ProductId = 10, ProductName = "Chè thập cẩm", Price = 25000 }
        };

        public static List<Order> Orders = new List<Order>();
    }
}

using POS_Backend.Models;

namespace POS_Backend.Data
{
    public static class SeedData
    {
        public static List<Product> Products = new List<Product>
        {
            new Product { ProductId = 1, ProductName = "Cà phê sữa đá", Price = 25000, ImageUrl = "https://tse3.mm.bing.net/th/id/OIP.oy32FnkDF3YotXVK5EfgzAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
            new Product { ProductId = 2, ProductName = "Trà sữa trân châu", Price = 35000, ImageUrl = "https://tse3.mm.bing.net/th/id/OIP.V1x45a263htiSm8-e2geyAHaEo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
            new Product { ProductId = 3, ProductName = "Bánh mì pate", Price = 20000, ImageUrl = "https://banhmihanoi.net/wp-content/uploads/2020/05/banh-mi-pate-2.jpg" },
            new Product { ProductId = 4, ProductName = "Sinh tố dâu", Price = 40000, ImageUrl = "https://www.hoidaubepaau.com/wp-content/uploads/2015/12/sinh-to-dau.jpg" },
            new Product { ProductId = 5, ProductName = "Nước suối", Price = 10000, ImageUrl = "https://cdn.medigoapp.com/product/thong_bao_thay_doi_bao_bi_moi_nuoc_suoi_aquafina_202109251100490984_414752d47a.jpg" },
            new Product { ProductId = 6, ProductName = "Bánh ngọt", Price = 30000, ImageUrl ="https://tse3.mm.bing.net/th/id/OIP.uxiOP1qXOSGDwrcKaclAJwHaFj?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
            new Product { ProductId = 7, ProductName = "Cơm tấm", Price = 45000, ImageUrl = "https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/09_2022/quan-com-tam-0o-ha-noi-tuong-han_.jpg" },
            new Product { ProductId = 8, ProductName = "Phở bò", Price = 50000, ImageUrl = "https://tse4.mm.bing.net/th/id/OIP.Jji8YeTglk1d4MFtBp-mSAHaFw?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" },
            new Product { ProductId = 9, ProductName = "Gỏi cuốn", Price = 15000, ImageUrl = "https://i.pinimg.com/originals/67/d7/78/67d7783ac04c8b98d5daa12955379c67.png" },
            new Product { ProductId = 10, ProductName = "Chè thập cẩm", Price = 25000, ImageUrl = "https://tse3.mm.bing.net/th/id/OIP.z2_PSs4nejCE4UwwyNfw0gHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3" }
        };

        public static List<Order> Orders = new List<Order>();
    }
}

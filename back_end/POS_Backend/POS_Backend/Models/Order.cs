namespace POS_Backend.Models
{
    public class Order
    {
        public int OrderId { get; set; } = 0;
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}

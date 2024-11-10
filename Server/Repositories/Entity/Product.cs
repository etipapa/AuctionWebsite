using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Entity
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Image { get; set; }
        public double Price { get; set; }
        public int ProductSellerId { get; set; }
        [ForeignKey("ProductSellerId")]
        public virtual User ProductSeller { get; set; }
        public DateTime SaleEndDate { get; set; }
        public bool IsSold { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }

        public virtual ICollection<Bid> Bids { get; set; }
        public virtual ICollection<Messege> MessegesToTheSeller { get; set; }

    }
}

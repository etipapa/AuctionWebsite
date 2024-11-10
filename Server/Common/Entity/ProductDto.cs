using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class ProductDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int ProductSellerID { get; set; }
        public int CategoryId { get; set; }
        public string? Image { get; set; }
        public IFormFile? FileImage { get; set; }

        // public User ProductSeller { get; set; }
        public DateTime SaleEndDate { get; set; }
        public bool IsSold { get; set; }
        public virtual ICollection<BidDto>? Bids { get; set; }

    }
}

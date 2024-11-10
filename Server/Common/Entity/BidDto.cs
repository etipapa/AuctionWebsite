using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class BidDto
    {
        //mjkfjuhloji
        public int? Id { get; set; }
        public int ProductId { get; set; }
      //  public ProductDto? Product { get; set; }
       public int UserId { get; set; }
       // public UserDto?   User { get; set; }
       
        public double Sum { get; set; }
        public DateTime DateTime { get; set; }

    }
}

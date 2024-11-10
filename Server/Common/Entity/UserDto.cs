using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual ICollection<BidDto> Bids { get; set; }
        //  public virtual ICollection<Product> ProductToBuy { get; set; }
        public virtual ICollection<MessageDto> Messeges { get; set; }

    }
}

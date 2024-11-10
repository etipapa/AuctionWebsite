using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Entity
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Product> ProductsToSale { get; set; }
        public virtual ICollection<Bid> Bids { get; set; }
        public virtual ICollection<Messege> Messeges { get; set; }

    }
}

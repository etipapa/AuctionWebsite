using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Entity
{
    public class Messege
    {
        //hi eti!!!!!!
        //by by
        public int Id { get; set; } 
        public int BuyerId { get; set; }
        [ForeignKey("BuyerId")]
        public virtual User Buyer { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        public string Content { get; set; }
        public string ReturnContent { get; set; }

        public DateTime DateTime { get; set; }
        public bool Status { get; set; }
    }
}

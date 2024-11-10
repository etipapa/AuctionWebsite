using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class MessageDto
    {
        public int? Id { get; set; }
       public int? BuyerId { get; set; }
       // public User buyer { get; set; }
        public string? Content { get; set; }
        public string? ReturnContent { get; set; }
        public int? ProductId { get; set; }
        public virtual ProductDto? Product { get; set; }

        public DateTime? DateTime { get; set; }
        public bool Status { get; set; }

    }
}

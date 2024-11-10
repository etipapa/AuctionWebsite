using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Repositories.Entity;
using Microsoft.EntityFrameworkCore;


namespace Repositories.Interfaces
{
    public interface IContext
    {
        public DbSet<Bid> Bids { get; set; }
        public DbSet<Category> Categorys { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Messege> Messeges { get; set; }
        public DbSet<Product> Products { get; set; }
        public Task save();
    }
}

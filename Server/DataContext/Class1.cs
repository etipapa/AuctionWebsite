using System.Collections.Generic;
using System.Data;
using System.Security.Claims;
using System.Security;
using Repositories.Interfaces;
using Repositories.Entity;
using Microsoft.EntityFrameworkCore;

namespace DataContext
{
    public class DataContext1 : DbContext, IContext
    {
       
       
        public DbSet<Bid> Bids { get ; set ; }
        public DbSet<Category> Categorys { get ; set ; }
        public DbSet<User> Users { get ; set ; }
        public DbSet<Messege> Messeges { get ; set ; }
        public DbSet<Product> Products { get ; set ; }

        public async Task save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocalDB;database=mydbAuctions;trusted_connection=true;");
            //server=NOA;database=myDataBase_1;trusted_connection=true;TrustServerCertificate=true;
            optionsBuilder.UseSqlServer("server=DESKTOP-SSNMLFD;database=mydbAuctionsCorect;trusted_connection=true;TrustServerCertificate=true;");
        }
    }  
}
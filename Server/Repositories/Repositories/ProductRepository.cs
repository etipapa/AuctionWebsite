using Repositories.Entity;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Repositories.Repositories
{
    internal class ProductRepository:IRepository<Product>
    {
        private readonly IContext _context;
        public ProductRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Product> addItemAsync(Product item)
        {
            await _context.Products.AddAsync(item);
            await _context.save();
            return item;
        }
        

        public async Task deleteAsync(int id)
        {
            _context.Products.Remove(await getAsync(id));
            await _context.save();
        }
        public async Task<Product> getAsync(int id)
        {
            return await _context.Products.Include(m => m.Bids).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Product>> getAllAsync()
        {
            return await _context.Products.ToListAsync();
        }
        public async Task updateAsync(int id, Product entity)
        {
            Product p = this._context.Products.FirstOrDefault(x => x.Id == id);
            p.IsSold=entity.IsSold;
            //p.Price=entity.Price;
            //p.SaleEndDate=entity.SaleEndDate;
            //p.IsSold=entity.IsSold;
            //p.Description=entity.Description;
            //p.Name=entity.Name;
            //p.CategoryId=entity.CategoryId;
            await _context.save();
        }
    }
}

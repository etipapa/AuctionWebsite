using Repositories.Entity;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Repositories
{
    public class CategoryRepository:IRepository<Category>
    {
        private readonly IContext _context;
        public CategoryRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Category> addItemAsync(Category item)
        {
            await _context.Categorys.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task deleteAsync(int id)
        {
            _context.Categorys.Remove(await getAsync(id));
            await _context.save();

        }
        public async Task<Category> getAsync(int id)
        {
            return await _context.Categorys.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Category>> getAllAsync()
        {
            return await _context.Categorys.ToListAsync();
        }
        public async Task updateAsync(int id, Category entity)
        {
            Category c = this._context.Categorys.FirstOrDefault(x => x.Id == id);
            c.Name=entity.Name; 
            await _context.save();
        }

        
    }
}

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
    public class MessageRepository:IRepository<Messege>
    {
        private readonly IContext _context;
        public MessageRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Messege> addItemAsync(Messege item)
        {
            await _context.Messeges.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task deleteAsync(int id)
        {
            _context.Messeges.Remove(await getAsync(id));
            await _context.save();

        }
        public async Task<Messege> getAsync(int id)
        {
            return await _context.Messeges.Include(o=>o.Product).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Messege>> getAllAsync()
        {
            return await _context.Messeges.Include(i=>i.Product).ToListAsync();
        }
        public async Task updateAsync(int id, Messege entity)
        {
            Messege m = this._context.Messeges.FirstOrDefault(x => x.Id == id);
            m.ReturnContent=entity.ReturnContent;
            m.DateTime = new DateTime();
            await _context.save();
        }
    }
}

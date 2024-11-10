using Repositories.Entity;
using Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Aspose.Email;
using Aspose.Email.Clients;
using Aspose.Email.Clients.Smtp;

namespace Repositories.Repositories
{
    public class BidRepository : IRepository<Bid>
    {
        private readonly IContext _context;
        public BidRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Bid> addItemAsync(Bid item)
        {
            await _context.Bids.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task deleteAsync(int id)
        {
            _context.Bids.Remove(await getAsync(id));
            await _context.save();

        }

        public async Task<Bid> getAsync(int id)
        {
            return  await _context.Bids.Include(m=>m.User).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Bid>> getAllAsync()
        { 
            return await _context.Bids.OrderBy(y=>y.Sum).ToListAsync();
        }
        public async Task updateAsync(int id, Bid entity)
        {
            Bid bid = this._context.Bids.FirstOrDefault(x => x.Id == id);
            bid.Sum=entity.Sum;
            bid.DateTime=entity.DateTime;
            await _context.save();
        }
    }
}

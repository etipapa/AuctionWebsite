using Repositories.Entity;
using Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Repositories.Repositories
{
    public class UserRepository : IRepositoryExtention<User,Messege>
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
        }
        public async Task<User> addItemAsync(User item)
        {
            User u = item;

            //if (!await IsValidEmail(customers.Email))
            //{
            //    // טפל במייל לא תקין (לדוגמא: זרוק חריג או הצג הודעת שגיאה)
            //    
            //}
            var existingCustomer = await _context.Users.FirstOrDefaultAsync(c => c.Email == item.Email);


            if (existingCustomer != null)
            {
                throw new Exception("כתובת מייל זו כבר קיימת במערכת");
                //await Console.Out.WriteLineAsync("כתובת מייל זו כבר קיימת במערכת");
                //var error = new { message = "כתובת מייל זו כבר קיימת במערכת" };
                //return null; // לא להוסיף לקוח
            }
            await _context.Users.AddAsync(item);
            await _context.save();
            return item;
            //await _context.Users.AddAsync(item);
            //await _context.save();
            //return item;
        }

        public async Task deleteAsync(int id)
        {
            _context.Users.Remove(await getAsync(id));
            await _context.save();

        }
        public async Task<User> getAsync(int id)
        {
            return await _context.Users.Include(l => l.Bids).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<User>> getAllAsync()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task updateAsync(int id, User entity)
        {
            User u = this._context.Users.FirstOrDefault(x => x.Id == id);
            u.FirstName = entity.FirstName;
            u.LastName = entity.LastName;
            u.Email = entity.Email;
            u.Password = entity.Password;
            await _context.save();
        }

        public async Task<List<Messege>> getMessegeBySeller(int id)
        {
            List<Messege> l1=
            await _context.Messeges.Include(y=>y.Product).Where(m=>m.BuyerId== id&&m.ReturnContent!="").ToListAsync();
            List<Messege> l2 = await _context.Messeges.Include(messege => messege.Product).
                  Where(m => m.Product.ProductSellerId == id&&m.ReturnContent=="").ToListAsync();
            List<Messege> allMessages = l1.Concat(l2).OrderByDescending(m => m.DateTime).ToList();
            return allMessages;
        }
        public async Task<List<Messege>> getMessegeSendUser(int id)
        {
            List<Messege> l1 =
            await _context.Messeges.Include(y => y.Product).Where(m => m.BuyerId == id && m.ReturnContent == "").ToListAsync();
            List<Messege> l2 = await _context.Messeges.Include(messege => messege.Product).
                  Where(m => m.Product.ProductSellerId == id && m.ReturnContent != "").ToListAsync();
            List<Messege> allMessages = l1.Concat(l2).OrderByDescending(m => m.DateTime).ToList();
            return allMessages;
        }
        public User getUserByLogin(string email, string password)
        {
            User c = this._context.Users.Include(y=>y.Bids).FirstOrDefault(x => x.Email == email && x.Password == password);
           
                // JsonConvert.SerializeObject(bids);
            if (c != null)
                return c;
            return null;
        }

    }
}

using AutoMapper;
using Common.Entity;
using MailKit.Security;
using MimeKit;
using Repositories.Entity;
using Repositories.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Service.Services
{
    public class ProductService:IService<ProductDto>
    {
        private readonly IMapper mapper;
        private readonly IRepository<Product> repository;
        private readonly IRepository<Bid> repositoryBid;
        private readonly IRepositoryExtention<User, Messege> repositoryUser;


        public ProductService(IRepository<Product> repository, IRepository<Bid> BidRepository, IRepositoryExtention<User, Messege> repositoryU, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.repositoryBid = BidRepository;
            this.repositoryUser = repositoryU;
        }
        public async Task<ProductDto> AddAsync(ProductDto entity)
        {
            Product p = mapper.Map<Product>(entity);
            // רשימת הקטגוריות רייקה, נאתחל ונמלא אותה בערכים מרשימת הקודים
            //p.Bids = new HashSet<Bid>();
            //foreach (var item in entity.BidsIds)
            //{
            //    var bid = await repositoryBid.getAsync(item);
            //    if (bid != null)
            //    {
            //        p.Bids.Add(bid);
            //    }
            //}
            // כעת האוובייקט מכיל גם את רשימת הקטגוריות
           return mapper.Map<ProductDto>( await this.repository.addItemAsync(p));
          //  return mapper.Map<UserDto>(await repository.addItemAsync(mapper.Map<User>(entity)));

        }
        public async Task deleteAsync(int id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<List<ProductDto>> getAllAsync()
        {

            List<Product> ls = await repository.getAllAsync();
            List<Product> pastProducts = ls.Where(product => product.SaleEndDate < DateTime.Now).ToList();
            foreach(Product p in pastProducts)
            {
                p.IsSold = true;
                await repository.updateAsync(p.Id, p);
                //List<Bid> ls1 = (List<Bid>)p.Bids;
                //List<Bid> sortedBids = (List<Bid>)ls1.OrderByDescending(b => b.Sum);
                //Bid b = sortedBids.First();
                //User u = await repositoryUser.getAsync(b.UserId);
                //SendEmailToUser(u, p);

            }
            return mapper.Map<List<ProductDto>>(await repository.getAllAsync());
        }

        private async Task SendEmailToUser(User u, Product p)
        {
            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("atikot4you@gmail.com", "evaw zrdh dgws ctpa");
                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("מכירה פומבית לעתיקות", "atikot4you@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(u.Email));

                    message.Subject = "המכירה הסתימה";
                    message.Body = new TextPart("plain")
                    {
                        Text = $"שלום {u.FirstName} ברכותינו!!!זכית ב {p.Name}. אתה הצעת את ההצעה הגבוהה ביותר"
                    };

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                Console.WriteLine("Mail Sent Successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }

        public async Task<ProductDto> getAsync(int id)
        {
            return mapper.Map<ProductDto>(await repository.getAsync(id));
        }

        public async Task updateAsync(int id, ProductDto entity)
        {
            await repository.updateAsync(id, mapper.Map<Product>(entity));
            Product p =await repository.getAsync(id);
            List <Bid>ls= (List<Bid>)p.Bids;
            var sortedBids = ls.OrderByDescending(b => b.Sum);
            Bid b = sortedBids.First();
            User u = await repositoryUser.getAsync(b.UserId);
            SendEmailToUser(u, p);
        }
    }
}

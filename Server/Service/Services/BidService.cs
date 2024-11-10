using AutoMapper;
using Common.Entity;
using Repositories.Entity;
using Repositories.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
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
    public class BidService : IService<BidDto>
    {
        private readonly IMapper mapper;
        private readonly IRepository<Bid> repository;
        private readonly IRepository<Product> repositoryProduct;
        private readonly IRepositoryExtention<User,Messege> repositoryUser;
        public BidService(IRepository<Bid> repository, IRepository<Product> repositoryP, IRepositoryExtention<User, Messege> repositoryU, IMapper mapper)
        {
            this.repository = repository;
            this.repositoryProduct = repositoryP;
            this.repositoryUser=repositoryU;
            this.mapper = mapper;
        }
        public async Task<BidDto> AddAsync(BidDto entity)
        {
            List<Bid> lst = await repository.getAllAsync();
            List<Bid> lst1 = lst.FindAll(i => i.ProductId == entity.ProductId).OrderByDescending(u => u.DateTime).ToList();
            if(lst1.Count>0) {   int idUser = lst1[0].UserId;
            int idProduct = entity.ProductId;
            Product p=await repositoryProduct.getAsync(idProduct);
            User u=await repositoryUser.getAsync(idUser);
            SendEmailToUser(u,p);}
          
            //evaw zrdh dgws ctpa
            return mapper.Map<BidDto>(await repository.addItemAsync(mapper.Map<Bid>(entity)));
        }
        private async Task SendEmailToUser( User u,Product p)
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

                    message.Subject = "יש לך מתחרים!!!";
                    message.Body = new TextPart("plain")
                    {
                        Text =$"שלום {u.FirstName} אנו פונים אליך בקשר להצעת מחיר שלך ל{p.Name}. יש משתמש שהציע הצעת מחיר גבוהה יותר. באפשרותך להכנס לאתר שלנו ולתת הצעת מחיר עוקפת."
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


        public async Task deleteAsync(int id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<List<BidDto>> getAllAsync()
        {
            return mapper.Map<List<BidDto>>(await repository.getAllAsync());
        }
      
        public async Task<BidDto> getAsync(int id)
        {
            return mapper.Map<BidDto>(await repository.getAsync(id));
        }

        public async Task updateAsync(int id, BidDto entity)
        {
            await repository.updateAsync(id, mapper.Map<Bid>(entity));
        }
    }
}

using Common.Entity;
using Repositories.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IServicesExtention<T,Q>:IService<T>
    {
        public Task<T> GetUserByUserMail(string userName);
        public  Task<List<Q>> getMessegeBySeller(int id);
        public  Task<List<Q>> getMessegeSendUser(int id);
        public UserDto Login(string email, string password);



    }
}

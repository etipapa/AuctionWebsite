using Repositories.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface IRepositoryExtention<T,Q>:IRepository<T>
    {
        public Task<List<Q>> getMessegeBySeller(int id);
        public Task<List<Q>> getMessegeSendUser(int id);
        public User getUserByLogin(string email, string password);

    }
}

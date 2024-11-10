using Repositories.Entity;
using Repositories.Interfaces;
using Repositories.Repositories;
using Microsoft.Extensions.DependencyInjection;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public static class ExtensionIserviceCollection
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {

            services.AddScoped(typeof(IRepositoryExtention<User,Messege>), typeof(UserRepository));
            services.AddScoped(typeof(IRepository<Messege>), typeof(MessageRepository));
            services.AddScoped(typeof(IRepository<Category>), typeof(CategoryRepository));
            services.AddScoped(typeof(IRepository<Bid>), typeof(BidRepository));
            services.AddScoped(typeof(IRepository<Product>), typeof(ProductRepository));

            return services;
        }
    }
}

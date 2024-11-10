using Common.Entity;
using Microsoft.Extensions.DependencyInjection;
using Repositories;
using Service.Interfaces;
using Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepositories();
            services.AddScoped(typeof(IServicesExtention<UserDto, MessageDto>), typeof(UserService));
            services.AddScoped(typeof(IService<CategoryDto>), typeof(CategoryService));
            services.AddScoped(typeof(IService<BidDto>), typeof(BidService));
            services.AddScoped(typeof(IService<ProductDto>), typeof(ProductService));
            services.AddScoped(typeof( IService<MessageDto>), typeof(MessageService));
            services.AddAutoMapper(typeof(MapperProfile));
            return services;
        }
    }
}

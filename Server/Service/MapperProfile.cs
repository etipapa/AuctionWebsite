using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Common.Entity;
using Repositories.Entity;
using AutoMapper;

namespace Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            CreateMap<UserDto, User>().ReverseMap();
            CreateMap<MessageDto, Messege>().ReverseMap();
            CreateMap<ProductDto, Product>().ReverseMap();
            CreateMap<BidDto, Bid>().ReverseMap();
            CreateMap<CategoryDto, Category>().ReverseMap();
        }
    }
}

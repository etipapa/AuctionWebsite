using AutoMapper;
using Common.Entity;
using Repositories.Entity;
using Repositories.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class UserService:IServicesExtention<UserDto,MessageDto>
    {
        private readonly IMapper mapper;
        private readonly IRepositoryExtention<User,Messege> repository;
        public UserService(IRepositoryExtention<User,Messege> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<UserDto> AddAsync(UserDto entity)
        {
            return mapper.Map<UserDto>(await repository.addItemAsync(mapper.Map<User>(entity)));
        }
        public async Task deleteAsync(int id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<List<UserDto>> getAllAsync()
        {
            return mapper.Map<List<UserDto>>(await repository.getAllAsync());
        }

        public async Task<UserDto> getAsync(int id)
        {
            return mapper.Map<UserDto>(await repository.getAsync(id));
        }
        public async Task<UserDto> GetUserByUserMail(string userName)
        {
            var lst = await this.repository.getAllAsync();
            foreach (var item in lst)
            {
                if (item.Email== userName)
                {
                    return mapper.Map<UserDto>(item);
                }
            }
            throw new Exception();
        }

        public async Task updateAsync(int id, UserDto entity)
        {
            await repository.updateAsync(id, mapper.Map<User>(entity));
        }
        public async Task<List<MessageDto>> getMessegeBySeller(int id)
        {
            return mapper.Map<List<MessageDto>>(await repository.getMessegeBySeller(id));
        }
        public async Task<List<MessageDto>> getMessegeSendUser(int id)
        {
            return mapper.Map<List<MessageDto>>(await repository.getMessegeSendUser(id));
        }
        public UserDto Login(string email, string password)
        {
            return mapper.Map<UserDto>(repository.getUserByLogin(email, password));
        }

    }
}

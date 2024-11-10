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
    public class MessageService:IService<MessageDto>
    {//1
        private readonly IMapper mapper;
        private readonly IRepository<Messege> repository;
       // private readonly IRepository<User> repositoryUser;

        public MessageService(IRepository<Messege> repository,/*IRepository<User> repositoryUser,*/ IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
           // this.repositoryUser = repositoryUser;
        }
        public async Task<MessageDto> AddAsync(MessageDto entity)
        {
            return mapper.Map<MessageDto>(await repository.addItemAsync(mapper.Map<Messege>(entity)));
        }
        public async Task deleteAsync(int id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<List<MessageDto>> getAllAsync()
        {
            return mapper.Map<List<MessageDto>>(await repository.getAllAsync());
        }

        public async Task<MessageDto> getAsync(int id)
        {
            return mapper.Map<MessageDto>(await repository.getAsync(id));
        }

        public async Task updateAsync(int id, MessageDto entity)
        {
            await repository.updateAsync(id, mapper.Map<Messege>(entity));
        }
    }
}

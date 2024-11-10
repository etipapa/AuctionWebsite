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
    public class CategoryService:IService<CategoryDto>
    {
        private readonly IMapper mapper;
        private readonly IRepository<Category> repository;
        public CategoryService(IRepository<Category> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<CategoryDto> AddAsync(CategoryDto entity)
        {
            return mapper.Map<CategoryDto>(await repository.addItemAsync(mapper.Map<Category>(entity)));
        }
        public async Task deleteAsync(int id)
        {
            await repository.deleteAsync(id);
        }

        public async Task<List<CategoryDto>> getAllAsync()
        {
            return mapper.Map<List<CategoryDto>>(await repository.getAllAsync());
        }

        public async Task<CategoryDto> getAsync(int id)
        {
            return mapper.Map<CategoryDto>(await repository.getAsync(id));
        }

        public async Task updateAsync(int id, CategoryDto entity)
        {
            await repository.updateAsync(id, mapper.Map<Category>(entity));
        }
    }
}

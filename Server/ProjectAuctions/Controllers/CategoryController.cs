using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAuctions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IService<CategoryDto> service;
        public CategoryController(IService<CategoryDto> service)
        {
            this.service = service;
        }


        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<List<CategoryDto>> Get()
        {
            return await service.getAllAsync();
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<CategoryDto> Get(int id)
        {
            return await service.getAsync(id);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryDto value)
        {
            return Ok(await service.AddAsync(value));
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] CategoryDto r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
    }
}

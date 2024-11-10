using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAuctions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IService<MessageDto> service;
        public MessageController(IService<MessageDto> service)
        {
            this.service = service;
        }
        // GET: api/<MessageController>
        [HttpGet]
        public async Task<List<MessageDto>> Get()
        {
            return await service.getAllAsync();
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public async Task<MessageDto> Get(int id)
        {
            return await service.getAsync(id);
        }

        // POST api/<MessageController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MessageDto value)
        {
            return Ok(await service.AddAsync(value));
        }


        

        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] MessageDto r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
    }
}

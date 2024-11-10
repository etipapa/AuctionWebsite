using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAuctions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {
        private readonly IService<BidDto> service;
        public BidController(IService<BidDto> service)
        {
            this.service = service;
        }


        // GET: api/<BidController>
        [HttpGet]
        public async Task<List<BidDto>> Get()
        {
            return await service.getAllAsync();
        }

        // GET api/<BidController>/5
        [HttpGet("{id}")]
        public async Task<BidDto> Get(int id)
        {
            return await service.getAsync(id);
        }

        // POST api/<BidController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BidDto value)
        {
            return Ok(await service.AddAsync(value));
        }

        // PUT api/<BidController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] BidDto r)
        {
            await service.updateAsync(id, r);
        }
        // DELETE api/<BidController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
    }
}

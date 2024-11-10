using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Repositories.Entity;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAuctions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IService<ProductDto> service;

        public ProductController(IService<ProductDto> service)
        {
            this.service = service;
        }
        // GET: api/<ProductController>
        [HttpGet]
        public async Task<List<ProductDto>> Get()
        {
            var products= await service.getAllAsync();
            foreach (var product in products)
            {
                product.Image = GetImage(product.Image);
            }
            return products;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ProductDto> Get(int id)
        {
           var product = await service.getAsync(id);
            product.Image = GetImage(product.Image);
            return product;
        }

        // POST api/<ProductController>
        //[HttpPost]
        //public async Task Post([FromBody] ProductDto role)
        //{
        //    await service.AddAsync(role);
        //}
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ProductDto singlersDto)
        {

            var myPath = Path.Combine(Environment.CurrentDirectory + "/imgs/" + singlersDto.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                singlersDto.FileImage.CopyTo(fs);
                fs.Close();
            }

            singlersDto.Image = singlersDto.FileImage.FileName;
            return Ok(await service.AddAsync(singlersDto));
        }

        // PUT api/<ProductController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ProductDto r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory, "imgs/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
    }
}

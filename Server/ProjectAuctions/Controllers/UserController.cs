using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectAuctions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IServicesExtention<UserDto, MessageDto> service;
        private IConfiguration configuration;


        public UserController(IServicesExtention<UserDto, MessageDto> service, IConfiguration configuration)
        {
            this.configuration = configuration;
            this.service = service;
        }
        // GET: api/<UserController>
        //[HttpGet]
        //public async Task<List<UserDto>> Get()
        //{
        //    return await service.getAllAsync();
        //}

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            UserDto u= await service.getAsync(id);

            var token = Generate(u);
            return Ok(token);
        }
        [HttpGet("user/{userName}")]
        public async Task<UserDto> GetByUserMail(string userName)
        {
            return await service.GetUserByUserMail(userName);
        }
        [HttpGet("user/GetMessegeByUser/{userId}")]
        public async Task<List<MessageDto>> GetMessegeByUser(int userId)
        {
            return await service.getMessegeBySeller(userId);

        }
        [HttpGet("user/getMessegeSendUser/{userId}")]

        public async Task<List<MessageDto>> getMessegeSendUser(int userId)
        {
            return await service.getMessegeSendUser(userId);
        }


        // POST api/<UserController>
        [HttpPost]

        public async Task<ActionResult> Post([FromBody] UserDto value)
        {
            return Ok(await service.AddAsync(value));

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] UserDto r)
        {
            await service.updateAsync(id, r);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.deleteAsync(id);
        }
        //[HttpGet("{id}")]
        //public async Task<List<MessageDto>> GetProductForSeller(int id)
        //{

        //}
        private string Generate(UserDto user)
        {
            var b = JsonConvert.SerializeObject(user.Bids);
            //מפתח להצפנה-מהקובץ appsettings
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            //אלגוריתם להצפנה
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            //אלו שדות להצפין
            var claims = new[] {
            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.GivenName,user.FirstName),
            new Claim(ClaimTypes.Surname,user.LastName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // החלף את Id עם תכונת מזהה המשתמש בפועל
            new Claim(ClaimTypes.Sid,JsonConvert.SerializeObject(user.Bids)),
            };
            var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"],
                claims,
                //תוקף ההזמנה
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //שליפת המשתמש מהטוקן
        private UserDto GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userId = identity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                var UserClaim = identity.Claims;
                if (userId != null)
                {
                    return new UserDto()
                    {
                        Id = int.Parse(userId),
                        //Id=UserClaim.FirstOrDefault(x=>x.Type==ClaimTypes.NameIdentifier)?.Value,
                        FirstName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
                        Email = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
                        LastName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value,
                    };
                }
            }
            return null;
        }
        private async Task<UserDto> Authenticate(string Email, string Password)
        {
            return service.Login(Email, Password);
        }
        [HttpPost("/login")]
        public async Task<ActionResult> Login([FromBody] UserDto customers)
        {
            UserDto c = await Authenticate(customers.Email, customers.Password);
            if (c != null)
            {
                var token = Generate(c);
                return Ok(token);
            }
            return NotFound("user not found");

        }
        //
    }
}

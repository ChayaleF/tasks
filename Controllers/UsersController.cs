//using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Tasks.Interfaces;
using Tasks.Models;
//  using Users.Services;
 //using Users.Interfaces;

namespace Tasks.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    IUserServices UsersService;

    public UsersController(IUserServices UserServices)
    {
        this.UsersService=UserServices;
    }

    [HttpGet]
    public ActionResult<List<User>> Get()
    {
        return UsersService.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<User> Get(int id)
    {
        var User = UsersService.GetById(id);
        if (User == null)
            return NotFound();
        return User;
    }

    [HttpPost]
    public ActionResult Post(User newUser)
    {
        var newId = UsersService.Add(newUser);

        return CreatedAtAction("Post", 
            new {id = newId}, UsersService.GetById(newId));
    }

    [HttpPut("{id}")]
    public ActionResult Put(int id,User newUser)
    {
        var result = UsersService.Update(id, newUser);
        if (!result)
        {
            return BadRequest();
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public void Delete(int id)
    {
        var result=UsersService.Delete(id);
    }
}

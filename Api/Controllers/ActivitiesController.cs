using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly DataContext _context;

        public ActivitiesController(DataContext context) => _context = context;

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> Get()
        {
            var activities = await _context.Activities.ToListAsync();

            activities = new List<Activity>{
                new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Just another pub",
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "Roundhouse Camden",
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 2 months ago",
                        Category = "travel",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "film",
                        City = "London",
                        Venue = "Cinema",
                    }
            };

            return Ok(activities);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            return Ok(activity);
        }

        // POST api/activities
        [HttpPost]
        public void Post([FromBody] string activity)
        {
        }

        // PUT api/activities/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Activity activities)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

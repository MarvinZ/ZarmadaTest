using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using POCO;
using REPO;

namespace API.Controllers
{
    public class Surveys1Controller : ApiController
    {
        private Context db = new Context();

        // GET: api/Surveys1
        public IHttpActionResult GetSurveys1()
        {

            var surveys = db.Surveys.Include(i => i.Questions);
            if (surveys == null)
            {
                return NotFound();
            }

            return Ok(surveys.ToList());
        }

        // GET: api/Surveys1/5
        [ResponseType(typeof(Survey))]
        public IHttpActionResult GetSurvey(int id)
        {
            Survey survey = db.Surveys.Include(i => i.Questions).SingleOrDefault(e => e.Id == id);
            if (survey == null)
            {
                return NotFound();
            }

            return Ok(survey);
        }

        // PUT: api/Surveys1/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSurvey(int id, Survey survey)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != survey.Id)
            {
                return BadRequest();
            }

            db.Entry(survey).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SurveyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Surveys1
        [ResponseType(typeof(Survey))]
        public IHttpActionResult PostSurvey(Survey survey)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Surveys.Add(survey);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = survey.Id }, survey);
        }

        // DELETE: api/Surveys1/5
        [ResponseType(typeof(Survey))]
        public IHttpActionResult DeleteSurvey(int id)
        {
            Survey survey = db.Surveys.Find(id);
            if (survey == null)
            {
                return NotFound();
            }

            db.Surveys.Remove(survey);
            db.SaveChanges();

            return Ok(survey);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SurveyExists(int id)
        {
            return db.Surveys.Count(e => e.Id == id) > 0;
        }
    }
}
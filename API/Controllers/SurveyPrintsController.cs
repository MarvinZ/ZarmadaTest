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
    public class SurveyPrintsController : ApiController
    {
        private Context db = new Context();

        // GET: api/SurveyPrints
        public IQueryable<SurveyPrint> GetSurveyPrints()
        {
            return db.SurveyPrints;
        }

        // GET: api/SurveyPrints/5
        [ResponseType(typeof(SurveyPrint))]
        public IHttpActionResult GetSurveyPrint(int id)
        {
            SurveyPrint surveyPrint = db.SurveyPrints.Find(id);
            if (surveyPrint == null)
            {
                return NotFound();
            }

            return Ok(surveyPrint);
        }

        [ResponseType(typeof(SurveyPrint))]
        public IHttpActionResult GetSurveyPrintAnswersBySurveyId(int id)
        {
            var result = db.SurveyPrints.Where(e => e.SurveyId == id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result.ToList());
        }

        // GET: api/SurveyPrints/5
        [ResponseType(typeof(SurveyPrint))]
        public IHttpActionResult GetSurveyPrintBySurveyId(int id)
        {
            var surveyPrint = db.SurveyPrints.Where(e => e.SurveyId == id);


            //if (surveyPrint == null)
            //{
            //    return NotFound();
            //}

            return Ok(surveyPrint.ToList());
        }
        // POST: api/SurveyPrints
        [ResponseType(typeof(SurveyPrint))]
        public IHttpActionResult PostSurveyPrint(SurveyPrint surveyPrint)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SurveyPrints.Add(surveyPrint);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = surveyPrint.Id }, surveyPrint);
        }
        

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SurveyPrintExists(int id)
        {
            return db.SurveyPrints.Count(e => e.Id == id) > 0;
        }
    }
}
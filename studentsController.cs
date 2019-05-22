using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using StudentAPI.Models;

namespace StudentAPI.Controllers
{
    [EnableCors("*","*","*")]
    public class studentsController : ApiController
    {
        private studentEntities db = new studentEntities();

        // GET: api/students
        public IQueryable<student> Getstudents()
        {
            return db.students;
        }

        // GET: api/students/5
        [ResponseType(typeof(student))]
        public IHttpActionResult Getstudent(int id)
        {
            student student = db.students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }

        // PUT: api/students/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putstudent(int id, student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != student.stu_id)
            {
                return BadRequest();
            }

            db.Entry(student).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!studentExists(id))
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

        // POST: api/students
        [ResponseType(typeof(student))]
        public IHttpActionResult Poststudent(student student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.students.Add(student);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (studentExists(student.stu_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = student.stu_id }, student);
        }

        // DELETE: api/students/5
        [ResponseType(typeof(student))]
        public IHttpActionResult Deletestudent(int id)
        {
            student student = db.students.Find(id);
            if (student == null)
            {
                return NotFound();
            }

            db.students.Remove(student);
            db.SaveChanges();

            return Ok(student);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool studentExists(int id)
        {
            return db.students.Count(e => e.stu_id == id) > 0;
        }
    }
}
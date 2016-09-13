using System.Data.Entity.ModelConfiguration.Conventions;
using POCO;

namespace REPO
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class Context : DbContext
    {
        // Your context has been configured to use a 'Context' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'REPO.Context' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'Context' 
        // connection string in the application configuration file.
        public Context()
            : base("DefaultConnection")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        public virtual DbSet<Survey> Surveys { get; set; }
        public virtual DbSet<SurveyPrint> SurveyPrints { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Answer> Answers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }

    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}
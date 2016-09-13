using POCO;

namespace REPO.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<REPO.Context>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(REPO.Context context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            context.Surveys.AddOrUpdate(
              p => p.Name,
              new Survey { Name = "Test1 Survey" },
              new Survey { Name = "Test2 Survey" }
            );

            context.SaveChanges();

            context.Questions.AddOrUpdate(
          p => p.Name,
          new Question { Name = "Test1 question1", SurveyId=1 },
          new Question { Name = "Test2 question2", SurveyId=1 },
          new Question { Name = "Test2 question3", SurveyId=1 }

        );

            context.SaveChanges();

            //
        }
    }
}

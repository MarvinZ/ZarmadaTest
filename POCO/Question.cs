using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POCO
{
    public class Question : Audit
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual int SurveyId { get; set; }

        public virtual Survey Survey { get; set; }
    }
}

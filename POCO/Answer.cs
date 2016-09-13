using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POCO
{
    public class Answer : Audit
    {
        public virtual int Id { get; set; }
        public virtual int Value { get; set; }
        public virtual int QuestionId { get; set; }
        public virtual int SurveyPrintId { get; set; }
        public virtual Question Question { get; set; }
        public virtual SurveyPrint SurveyPrint { get; set; }

    }
}

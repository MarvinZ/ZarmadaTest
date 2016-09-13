using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace POCO
{
    public class Survey :Audit
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public ICollection<Question> Questions { get; set; }
        public ICollection<SurveyPrint> SurveyPrints { get; set; }


    }
}

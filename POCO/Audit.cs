using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POCO
{

    public class Audit
    {
        public string CreatedBy { get; set; }
        public DateTime? CreateDatetime { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedDatetime { get; set; }
        public string DeactivatedBy { get; set; }
        public DateTime? DeactivateDatetime { get; set; }


    }

}

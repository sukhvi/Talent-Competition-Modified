import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';


export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this) 
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
        const { job  } = this.props;
        return (<div className="ui cards" style={{marginBottom:'20px'}}>
        <div className="ui card fluid">
           <div className="content">
           
              <div className="header">{job.title}</div>
              <div className="meta">{job.location.city} {job.location.country}</div>
              <div className="description" style={{ minHeight:'100px'}}>
              <span className="ui black right ribbon label"><i aria-hidden="true" className="user icon"></i> 0</span>
                  <p>{job.summary}</p></div>
           </div>
           <div className="extra content job-summary" >
           
                <button className="ui red  button">Expired</button>
                <div className="ui buttons right floated">
                    <button className="ui basic primary button">Close</button>
                    <button className="ui basic primary button">Edit</button>
                    <button className="ui basic primary button">Copy</button>
                </div>  
                </div>
           
        </div>
        
     </div>)
    }
    
}

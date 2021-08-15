import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc",
                open:false
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            menu:false,
            filterValue:"",
            totalPages: 1,
            activeIndex: "",
            jobData:{}
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {

        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.loadData();
       
    };

    loadData(callback) {
        var link = 'https://leo-talent-services-talent.azurewebsites.net/listing/listing/getSortedEmployerJobs/';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here

       $.ajax({
        url: link,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "GET",
        success: function (res) {
            this.updateWithoutSave(res.myJobs)
        }.bind(this)
    })
    this.init()
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    updateWithoutSave(newValues) {
        
        let jobData = Object.assign({}, this.state.jobData, newValues)
        this.setState({
            jobData: jobData
        })
    }

    handleChooseFilterClick () {
        this.setState(prevState => ({ menu: !prevState.menu }));
    }

    handleFilterSelect(value) {
        this.setState({filterValue: value});
        this.setState(prevState => ({ menu: !prevState.menu }));
    }
    handleSortClick() {
        this.setState(prevState => ({ menu: !prevState.menu }));
    }

    handleSort(value) {
        debugger;
        this.setState(prevState => {
        let sortBy = Object.assign({}, prevState.sortBy);  // creating copy of state variable jasper
        sortBy.date = value;   
        sortBy.open = !prevState.sortBy.open;                     // update the name property, assign a new value                                   // update the name property, assign a new value                 
        return { sortBy };                            
    })
    }
    handleSortClick() {
       debugger;
       this.setState(prevState => {
        let sortBy = Object.assign({}, prevState.sortBy);  // creating copy of state variable jasper
        sortBy.open = !prevState.sortBy.open;                     // update the name property, assign a new value                 
        return { sortBy };  

    })
       
    }

    render() {
        const {jobData } = this.state;
        return (
            <BodyWrapper loaderData={this.state.loaderData} reload={this.loadData}>
                <section className="page-body">
                    <div className="ui container">
                        <h1 className="ui header">List of Jobs</h1>
                        <div className="row" style={{marginBottom:'30px'}}>
                            <div className="column">
                        <span className="filter">
                            <i aria-hidden="true" className="filter icon"></i>
                            <span>Filter: &nbsp;
                                <div role="listbox" aria-expanded="false" className={`ui inline dropdown ${this.state.menu ? "active visible" : ""}`} tabIndex="0">
                                    <div  aria-live="polite" role="alert" className="divider text" onClick={() => this.handleChooseFilterClick()}>
                                        {this.state.filterValue ? this.state.filterValue: "Choose Filter "}
                                    </div>
                                    <i className="dropdown icon"></i>
                                    <div className={`menu transition ${this.state.menu ? "visible" : ""}`} >
                                    <div  role="option" aria-checked="true"  className="item" onClick={() => this.handleFilterSelect("")}>
                                            <span className="text">Choose Filter</span>
                                        </div>
                                        <div  role="option" aria-checked="true"  className="item" onClick={() => this.handleFilterSelect("Department")}>
                                            <span className="text">Department</span>
                                        </div>
                                        <div  role="option" aria-checked="true"  className="item" onClick={() => this.handleFilterSelect("Salary")}>
                                            <span className="text">Salary</span>
                                        </div>
                                        <div  role="option" aria-checked="true"  className="item" onClick={() => this.handleFilterSelect("Job Type")}>
                                            <span className="text">Job Type</span>
                                        </div>
                                        
                                    </div>

                                    </div>
                            </span>
                      </span>


                      <span className="filter">
                            &nbsp; &nbsp;<i aria-hidden="true" className="calendar icon"></i>
                            <span>Sort by date: &nbsp;
                                <div role="listbox" aria-expanded="false" className={`ui inline dropdown ${this.state.sortBy.open ? "active visible" : ""}`} tabIndex="0">
                                    <div  aria-live="polite" role="alert" className="divider text" onClick={() => this.handleSortClick()}>
                                        {this.state.sortBy.date ==="desc" ? "Old First": "New First "}
                                    </div>
                                    <i className="dropdown icon"></i>
                                    <div className={`menu transition ${this.state.sortBy.open ? "visible" : ""}`} >
                                    <div  role="option" aria-checked="true"  className="item" onClick={() => this.handleSort("asc")}>
                                            <span className="text">New First</span>
                                        </div>
                                        <div  role="option" aria-checked="true"  className="item" onClick={() => this.handleSort("desc")}>
                                            <span className="text">Old First</span>
                                        </div>
                                    </div>
                                    </div>
                            </span>                           
                      </span>
                      </div>
                      </div>
                   

                    </div>
                    <div className="ui container">
                    <div className="ui centered three column grid">
                        <div className="row">
                            {
                                jobData && (Object.keys(jobData).length < 1) && <p>No Jobs found</p>
                            }
                            {
                                jobData && Object.keys(jobData).map((key,index)=> <div key={key} className="column">
                                <JobSummaryCard  job={jobData[key]}/>
                        </div>)
                            }
                            
                            
                        </div>
                        <div className="row" style={{marginBottom:"20px"}}>
                        
                            <div className="column" style={{textAlign:'center'}}>
                                <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
                                    <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="First item" type="firstItem" className="item">«</a>
                                    <a aria-current="false" aria-disabled="false" tabIndex="0" value="4" aria-label="Previous item" type="prevItem" className="item">⟨</a>
                                    <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" type="pageItem" className="item">1</a>
                                    <a aria-current="false" aria-disabled="false" tabIndex="0" value="6" aria-label="Next item" type="nextItem" className="item">⟩</a>
                                    <a aria-current="false" aria-disabled="false" tabIndex="0" value="10" aria-label="Last item" type="lastItem" className="item">»</a></div>
                            </div>
                        
                        </div>
                    </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
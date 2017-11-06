import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Newsfeed from '../Newsfeed/Newsfeed'
import { SearchService } from './search-service';

class Home extends Component {
    constructor() {
        super();
        
        this.searchService = new SearchService();
        this.state = {results: []};
      }
      componentDidMount() {
        this.searchService
            .getResults()
            .subscribe(res => {
              this.setState({results: res});
            });
      }
    
      search(event) {
        this.searchService.search({value: event.target.value.trim()});
      }
    render() {
        let results = this.state.results.map(res => {
            return <li className="list-group-item" key={res.title}>
                    <a href={`/profile/id={res.id}`}><img src={res.picture}/>{res.username}</a>
                   </li>  
          });
        return (
            <div>

            <div>
            </div>
                <Link to='/login'>
                <button>bob</button>
                </Link>
                <Link to='/create'>
                <button>Create Badge</button>
                </Link>

                <Link to='/post'>
                <button>Post Badge</button>
                </Link>

                <Link to='/profile'>
                <button>Profile</button>
                </Link>

                <Link to='/notifications'>
                <button>Notifications</button>
                </Link>

                <br/>
                <Newsfeed></Newsfeed>

            
                  <div className="form-group">
                  <h4>Search</h4>
                  <input className="form-control" placeholder="Search Term" type="text" onChange={this.search.bind(this)} />
                  <ul className="list-group">
                    {results}
                  </ul>
                </div></div>
        );
    }
}

export default Home;
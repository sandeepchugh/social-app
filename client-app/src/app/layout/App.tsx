import Axios from 'axios';
import React, { useEffect, useState,Fragment } from 'react';
import { Container, Header, Icon, List } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {

  const [ activities, setActivities ] = useState<IActivity[]>([]); 

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
        .then(response => {
          setActivities(response.data);
        }); 
  }, []);


  return (
    <Fragment>
      <NavBar></NavBar>
      <Container  style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}></ActivityDashboard>
      </Container>
    </Fragment>
  );

}

export default App;
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    setEditMode: (editMode:boolean) => void;
    setSelectedActivity: (selectedActivity: IActivity|null) => void;
}

const ActivityDetails: React.FC<IProps> = ({setEditMode,setSelectedActivity}) => {
    
  const activityStore = useContext(ActivityStore);
  const  {selectedActivity} = activityStore;

  return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity!.category}.jpg`} wrapped ui={false}/>
        <Card.Content>
    <Card.Header>{selectedActivity!.title}</Card.Header>
          <Card.Meta>
            <span>{selectedActivity!.date}</span>
          </Card.Meta>
          <Card.Description>
          {selectedActivity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths={2}>
                <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit'/>
                <Button onClick={() => setSelectedActivity(null)} basic color='grey' content='Cancel'/>
            </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default observer(ActivityDetails);
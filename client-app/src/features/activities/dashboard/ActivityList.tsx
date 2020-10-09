import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { act } from "react-dom/test-utils";
import { Item, Image, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
  deleteActivity: (
    event: React.SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

const ActivityList: React.FC<IProps> = ({
  deleteActivity,
  submitting,
  target
}) => {
  const activityStore = useContext(ActivityStore);
  const {activities, selectActivity } = activityStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  onClick={(e) => deleteActivity(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
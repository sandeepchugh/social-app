import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Container, Menu, Segment } from "semantic-ui-react";
import ActivityStore from '../../app/stores/activityStore';


const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  return (
      <Menu inverted fixed="top">
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>  
                Social App
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button positive onClick={activityStore.openCreateForm} content="Create Activity"></Button>
            </Menu.Item>
        </Container>
      </Menu>
  );
};

export default observer(NavBar);

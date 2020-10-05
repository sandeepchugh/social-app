import React from "react";
import { Button, Container, Menu, Segment } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({openCreateForm}) => {
  return (
      <Menu inverted fixed="top">
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>  
                Social App
            </Menu.Item>
            <Menu.Item name="Activities" />
            <Menu.Item>
                <Button positive onClick={openCreateForm} content="Create Activity"></Button>
            </Menu.Item>
        </Container>
      </Menu>
  );
};

export default NavBar;

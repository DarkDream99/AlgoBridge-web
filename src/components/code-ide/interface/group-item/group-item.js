import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import InterfaceItem from "../item";
import "./group-item.css";

const GroupInterfaceItem = (props) => {
    const {title, values, actions} = props;
    const items = values.map((value, index) => {
        return (
            <Dropdown.Item key={value}>
                <InterfaceItem value={value} action={() => actions[index]()}/>
            </Dropdown.Item>
        )
    });

    return (
        <DropdownButton className="interface-item" title={title}>
            {items}
        </DropdownButton>
    );
};

export default GroupInterfaceItem;
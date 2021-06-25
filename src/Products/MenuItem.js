import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import firebase, { db } from "../firebase";
import { DeleteOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Popconfirm, message, Button } from "antd";

const options = ["Delete"];
const ITEM_HEIGHT = 48;

export default function LongMenu({ docID }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        db.collection("products")
            .doc(docID)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };

    const text = "Are you sure to delete this Product?";

    function confirm() {
        message.info("The product has been deleted.");
        db.collection("products")
            .doc(docID)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const handleClose = ({uid}) => {
        setAnchorEl(null);
    };
   
    return (
        <>
            <div className="demo">
                <div style={{ marginLeft: 70, whiteSpace: "nowrap" }}></div>
                <div style={{ width: 70, float: "left" }}>
                    <Popconfirm
                        placement="left"
                        title={text}
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                   
                        <IconButton>
                            <DeleteOutlined
                                style={{ color: "blue", fontSize: "20px" }}
                            />
                        </IconButton>
                        
                    </Popconfirm>
                    <Popconfirm
                        placement="leftBottom"
                        title={text}
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    ></Popconfirm>
                </div>
            </div>

            <Button
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            ></Button>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        selected={option === "Delete"}
                        onClick={handleClose}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

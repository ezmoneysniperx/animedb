/** @jsxImportSource @emotion/react */

import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { css } from '@emotion/css'

const AddCollectionModal = ({ showModal, hideModal, addCollection }: { showModal: any, hideModal: any, addCollection: any}) => {

    const [nameInput, setNameInput] = useState(" ");

    const handleInputChange = (e: any) => {
        setNameInput(e.target.value);
    }

    const inputForm = css`
	box-shadow: 0px 0px 3px 0px #000;
    `

    return (
        <Modal show={showModal} onHide={hideModal} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Add New Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <input type="text" className={inputForm + " form-control"} value={nameInput} aria-describedby="emailHelp" onChange={handleInputChange} placeholder='Write new collection name here' />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => { addCollection(nameInput); setNameInput("");}}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCollectionModal;
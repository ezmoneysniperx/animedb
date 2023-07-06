/** @jsxImportSource @emotion/react */

import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { css } from '@emotion/css'

const EditCollectionModal = ({ showModal, hideModal, editCollection }: { showModal: any, hideModal: any, editCollection: any}) => {

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
                <Modal.Title>Edit Collection Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <input type="text" className={inputForm + " form-control"} value={nameInput} onChange={handleInputChange} placeholder='Write new collection name here' />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Cancel
                </Button>
                <Button variant="success" onClick={() => { editCollection(nameInput); setNameInput("");}}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditCollectionModal;
import React from 'react';

const Modal = ({ isModalOpen, closeModal, children }) => {
    const showHideClass = isModalOpen ? 'modal display-block' : 'modal display-none';

    return(
        // <div className="ui modal" onClick={closeModal}>
        //     <i className="close icon" onClick={closeModal}></i>
        //     {children}
        // </div>


        <div className={showHideClass} onClick={closeModal}>
            <div className="modal-wrapper">
                {children}
            </div>
            <button className="btn--close" onClick={closeModal}><i className="close icon"></i></button>
        </div>
    )

}

export default Modal;
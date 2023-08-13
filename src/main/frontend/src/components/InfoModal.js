import React, {useState} from "react";


export default function InfoModal( props ) {
 


  return (
    <div className={props.modalDisplayStyle}>
      <div className="overlay">
          <div className="container modal-box border"> 
            {props.children}
          </div>
      </div>
    </div>
  );
}
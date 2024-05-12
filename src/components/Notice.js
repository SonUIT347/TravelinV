import React from 'react'

// notice 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notice() {
   
    const showToastMessage = () => {
        toast.success('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
    
    }
    const notify = () => toast("Wow so easy!");
  return (
    <div>
       <button onClick={showToastMessage}>Click me to show notice</button>
       <button onClick={notify}>Notify!</button>
        <ToastContainer />
         
    </div>
  )
}

export default Notice
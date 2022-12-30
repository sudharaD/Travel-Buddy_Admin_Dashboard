import React from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const modalWrapper = {
  overflow:"auto",
  maxHeight:"80vh",
  display:"flex",
};

const modalBlock = {
  position:"relative",
  zIndex:0,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  margin:"auto",
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    mt:3,
    borderRadius:"10px",

  };

const ModalComponent = (props) => {
  const {children, name, open, setOpen, setItem} = props
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setItem(null)
};

  return (
    <div style={{margin:'1rem 0'}}>
        <Button onClick={handleOpen}>{name}</Button>
        <Modal
          sx={modalWrapper}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={modalBlock}>
              <Box sx={style}>
                  {children}
              </Box>
            </Box>
        </Modal>
    </div>
  )
}

export default ModalComponent
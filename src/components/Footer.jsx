import React from 'react';

const Footer = props => {
  const {
    selectedSlots,
    classRoot
  } = props
    
  const classRootMod = `${classRoot}--footer`
  console.log(selectedSlots)
  return (
    <div className={classRootMod}>
      <h5>
        {selectedSlots.length}
      </h5>
    </div>
  );
}

export default Footer

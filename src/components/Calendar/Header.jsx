import React from 'react';

const Title = props => {
  const {
    weekNumber, 
    startDay, 
    endDay, 
    dateTitleStartProps, 
    dateTitleEndProps, 
    classRoot
  } = props
    
  const classRootMod = `${classRoot}--title`
  return (
    <div className={classRootMod}>
      <h4>
        <span>KW: {weekNumber}, </span>  
        <span>{startDay.format(dateTitleStartProps)} {endDay.format(dateTitleEndProps)}</span>
      </h4>
    </div>
  );
}

export default Title

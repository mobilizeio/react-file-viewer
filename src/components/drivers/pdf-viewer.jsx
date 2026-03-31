// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';

function PDFDriver(props) {
  return (
    <object
      data={props.filePath}
      type="application/pdf"
      style={{ width: '100%', height: '100%' }}
    >
      <p>Unable to display PDF. <a href={props.filePath}>Download instead.</a></p>
    </object>
  );
}

export default PDFDriver;
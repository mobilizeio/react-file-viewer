// Copyright (c) 2017 PlanGrid, Inc.

import React from 'react';

function PDFDriver(props) {
  return (
    <object
      data={props.filePath}
      type="application/pdf"
    >
      <p>Unable to display PDF. <a href={props.filePath}>Download instead.</a></p>
    </object>
  );
}

export default PDFDriver;
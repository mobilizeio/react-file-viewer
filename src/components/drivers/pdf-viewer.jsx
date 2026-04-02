// Copyright (c) 2017 PlanGrid, Inc.

import React, { useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

function PDFDriver(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={props.filePath}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(p => p - 1)}
        >
          Previous
        </button>
        <span>Page {pageNumber} of {numPages}</span>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PDFDriver;

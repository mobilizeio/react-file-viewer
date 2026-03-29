const React = require('react');

const Document = ({ children }) => React.createElement('div', { className: 'pdf-document' }, children);
const Page = () => React.createElement('div', { className: 'pdf-page' });
const pdfjs = { GlobalWorkerOptions: {}, version: '0.0.0' };

module.exports = { Document, Page, pdfjs };

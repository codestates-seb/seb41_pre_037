const quillModule = {
  toolbar : [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block', 'link', 'image'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction        
    [{ 'header': 1 }, { 'header': 2 }], 
    ['clean']                                         // remove formatting button
  ]
}

export default quillModule
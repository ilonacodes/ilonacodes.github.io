+++
css = []
highlight = true
date = "2018-03-31T18:30:05+01:00"
title = "Front-end Shorts: How to Read Content From The File Input in React"
tags = ["react", "redux", "javascript", "file", "input", "frontend", "learntocode", "coding", "letsgetcoding", "womenwhocode"]
draft = false
scripts = []
description = "As you know, I prefer learning to code by doing things. So, the last feature I have implemented for the app is the reading of the content from the uploaded (local) `.csv` file from the user."
+++

Hi, everyone! How is your weekend going?

As you know, I prefer learning to code by doing things. So, the last feature I have implemented for the app is the reading of the content from the uploaded (local) `.csv` file from the user.

To do so without a server or any back-end—is a challenge.

To make things work properly in React+Redux, I have created the following component:

```javascript

const ImportFromFileBodyComponent = () => {
    let fileReader;

    const handleFileRead = (e) => {
        const content = fileReader.result;
        console.log(content);
        // … do something with the 'content' …
    };

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return <div className='upload-expense'>
        <input type='file'
               id='file'
               className='input-file'
               accept='.csv'
               onChange={e => handleFileChosen(e.target.files[0])}
        />
    </div>;
};

```

The `FileReader` object lets web apps asynchronously read the contents of files stored in the user's computer, using `File` or `Blob` objects to specify the file or data to read.

Then the `readAsText` method is used to read the contents of the specified `Blob` or `File`. When the read operation is complete, the state is changed to `done`; the `onloadend` is triggered, and, if `Filereader.result` is not null, the constant `content` contains the contents of the file as a text string.

Any `load` event of `fileReader` object sets the result value asynchronously,  and according to the code snippet above the `fileReader.onloadend` callback can access the result of uploaded file by the user.

If you would like to know more, then read about `FileReader`, `File`, and `readAsText` at [MDN](https://developer.mozilla.org/en-US/).

Thank you for reading. I hope you find the post useful and will still be looking forward to new updates on [my blog](/blog/).

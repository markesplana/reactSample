import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const html = '';
class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    const contentBlock = htmlToDraft(props.aboutDescription);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  };

  render() {
    const { editorState } = this.state;
    console.log("props.aboutDescription", this.props.aboutDescription)
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbar={{
            options: ['inline'],
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default Wysiwyg;

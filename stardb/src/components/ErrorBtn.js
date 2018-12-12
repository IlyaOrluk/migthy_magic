import React from 'react';

export default class ErrorBtn extends React.Component {


    state = {
        renderError: false
    };

    render() {
        
        console.log('render');
        if(this.state.renderError) {
            this.foo.bar = 0;
        }
    

    return (
        <button 
         className='error-button btn btn-danger'
         onClick={() => this.setState({renderError: true})}>
          Trow Error
         </button>
        );
    }
}
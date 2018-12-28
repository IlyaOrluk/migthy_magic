import React from 'react';
import ErrorBoundry from './ErrorBoundry';

    const Row = ({ left, right }) => {
        return (
            <ErrorBoundry>
                <div className="row mb2">
                        <div className="col-md-6">
                            { left }
                        </div>
                        <div className="col-md-6">
                            { right }
                        </div>
                    </div>
            </ErrorBoundry>
            
        )
    }


export default Row;

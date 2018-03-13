import React from 'react';
import './past.css';

import { Segment } from 'semantic-ui-react';

class Past extends React.Component {

    constructor(){
        super();
        this.loadRecord = this.loadRecord.bind(this);
    }

    loadRecord() {
        return (
            <div className="no-result">
                No Result
            </div>
        );
    }

    render() {
        return (
            <div className="past-part">
                <div className="past-title"><u><i>Past Record</i></u></div>
                <Segment
                    inverted={true}
                    className="past-segment"
                >
                    {this.loadRecord()}
                </Segment>
            </div>
        );
    }
}

export default Past;
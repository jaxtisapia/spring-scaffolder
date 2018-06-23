import React, { Component } from 'react';
import {connect} from "react-redux";
import createStore from "../utils/database/store";
import {convertToParamStructure} from "../utils/converter";
import {isValidJson} from "../utils/validator";

const { persistor, store } = createStore;

const {updateAuthor, updatePackageName, updateParamStructure} = require("../utils/database/actions/index");

class Input extends Component {

    constructor(props){
        super(props);

        this.setPackage = this.props.setPackage;
    }

    onPackageNameChanged = e => { store.dispatch( updatePackageName(e.target.value)); };
    onAuthorChanged = e => { store.dispatch(updateAuthor(e.target.value)); };
    onParamStructureChanged = e => {store.dispatch(updateParamStructure(e.target.value)); };

    render() {
        const {packageName, author, paramStructure} = this.props;
        const stringJson = JSON.stringify(convertToParamStructure(paramStructure), null, 1);

        return (
            <div className="uk-padding">

                <div className="uk-padding-small">
                    <label className="uk-form-label">Package Name</label>
                    <div className="uk-form-controls">
                        <input onChange={this.onPackageNameChanged} value={packageName} className="uk-input" id="form-stacked-text" type="text" placeholder="com.itconsortiumgh.artifactId"/>
                    </div>
                </div>

                <div className="uk-padding-small">
                    <label className="uk-form-label">Author Name</label>
                    <div className="uk-form-controls">
                        <input onChange={this.onAuthorChanged}  value={author} className="uk-input" id="form-stacked-text" type="text" placeholder="John Doe"/>
                    </div>
                </div>

                <div className="uk-padding-small">
                    <label className="uk-form-label">Json Structure of Parameters</label>
                    <textarea onChange={this.onParamStructureChanged} value={paramStructure} className="uk-textarea" rows="5" placeholder="Textarea"/>
                </div>

                <div className="uk-padding-small">
                    <label className="uk-form-label">Output Json</label>
                    <pre className={(isValidJson(stringJson))?"uk-form-success":"uk-form-danger"}>{stringJson}</pre>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        packageName: state.packageName,
        author: state.author,
        paramStructure: state.paramStructure,
    };
}

export default connect(mapStateToProps)(Input);
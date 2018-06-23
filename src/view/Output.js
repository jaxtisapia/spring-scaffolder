import React, {Component} from 'react';

import {directories} from "../utils/config";
import {CodeDiv} from "../component/CodeDiv";
import {CodeText} from "../component/CodeText";
import {sampleClass} from "../utils/constants";
import {
    generateControllerClass,
    generateModelClass,
    generateObjectResponseClass,
    generateObjectsResponseClass,
    generateRepositoryClass, generateResponseCodeClass,
    generateServiceClass,
    getClasses,
    getClassFields,
    getFieldDeclarationsFromClass
} from "../utils/generator";
import {connect} from "react-redux";
import {convertToParamStructure} from "../utils/converter";
import {isValidJson} from "../utils/validator";

const Replacer =  require("string-template");
const {model: modelPath, response: responsePath, service: servicePath,
    repository: repositoryPath, controller: controllerPath ,
    responseObject: responseObjectPath, responseObjects: responseObjectsPath
} = require("./../utils/config").paths;

const ProcessedGenerators = (props) => {

    const {classObject, packageName, author} = props;

    return getClasses( classObject).map((className) => {
        return (
            <li className="uk-background-muted uk-padding">
                <a className="uk-accordion-title" href="#">{className} Object</a>
                <div className="uk-accordion-content">

                    <p># {Replacer(modelPath, {Class: className})}</p>
                    <CodeDiv>
                        <CodeText>
                            echo '{generateModelClass(packageName, author, className, getFieldDeclarationsFromClass(getClassFields(className, classObject)))}' > {Replacer(modelPath, {Class: className})}
                        </CodeText>
                    </CodeDiv>

                    <p># {Replacer(repositoryPath, {Class: className})}</p>
                    <CodeDiv>
                        <CodeText>
                            echo '{generateRepositoryClass(packageName, author, className)}' > {Replacer(repositoryPath, {Class: className})}
                        </CodeText>
                    </CodeDiv>

                    <p># {Replacer(servicePath, {Class: className})}</p>
                    <CodeDiv>
                        <CodeText>
                            echo '{generateServiceClass(packageName, author, className)}'' > {Replacer(servicePath, {Class: className})}
                        </CodeText>
                    </CodeDiv>

                    <p># {Replacer(controllerPath, {Class: className})}</p>
                    <CodeDiv>
                        <CodeText>
                            echo '{generateControllerClass(packageName, author, className)}' > {Replacer(controllerPath, {Class: className})}
                        </CodeText>
                    </CodeDiv>

                    <p># {Replacer(responseObjectPath, {Class: className})}</p>
                    <CodeDiv>
                        <CodeText>
                            echo '{generateObjectResponseClass(packageName, author, className)}' > {Replacer(responseObjectPath, {Class: className})}
                        </CodeText>
                    </CodeDiv>

                    <p># {Replacer(responseObjectsPath, {Class: className})}</p>
                    <CodeDiv>
                        <CodeText>
                            echo '{generateObjectsResponseClass(packageName, author, className)}' > {Replacer(responseObjectsPath, {Class: className})}
                        </CodeText>
                    </CodeDiv>

                </div>
            </li>
        )
    })
};

class Output extends Component {

    render() {
        const {packageName, author, paramStructure} = this.props;
        const stringJson = JSON.stringify(convertToParamStructure(paramStructure), null, 1);

        let dirCreateText = "mkdir -p ";

        return (
            <div>

                {
                    directories.map((directory) => {
                        dirCreateText += ` ${directory}`
                    })
                }

                <h3>Spring Generator - xD</h3>
                <p># package Id - <span>{packageName}</span></p>

                <ul data-uk-accordion>

                <li className="uk-background-muted uk-padding uk-open">
                    <a className="uk-accordion-title" href="#">Initial Folders Creation</a>
                    <div className="uk-accordion-content">

                <CodeDiv>
                    <CodeText>{dirCreateText}</CodeText>
                </CodeDiv>
                    </div>
                </li>

                <li className="uk-background-muted uk-padding">
                    <a className="uk-accordion-title" href="#">General Response Class</a>
                    <div className="uk-accordion-content">

                <CodeDiv>
                    <CodeText>
                        echo '{generateResponseCodeClass(packageName)}' > {responsePath}
                    </CodeText>
                </CodeDiv>
                    </div>
                </li>


                    {
                        (!isValidJson(stringJson)? <CodeText>Invalid JSON or parameter structure</CodeText>:
                                <ProcessedGenerators classObject={JSON.parse(stringJson)} packageName={packageName} author={author} />
                        )
                    }

                </ul>

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

export default connect(mapStateToProps)(Output);
import React, { Component } from 'react';

export const CodeText = (props) => (
    <pre className="uk-text-danger">
        {props.children}
    </pre>
);
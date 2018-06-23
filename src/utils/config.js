const modelTemplate = `
package {package}
import lombok.Data

/**
*@author {author}
*@since ${new Date()}
*/
@Data
public class {Class} {
    {fields}
}`;

const repositoryTemplate = `
package {package}

import {package}.model.{Class};
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
*@author {author}
*@since ${new Date()}
*/
@Repository
public interface {Class}Repository extends CrudRepository<{Class}, Long> {
}
`;

const controllerTemplate = `
package {package}

import {package}.service.{Class}Service;
import {package}.model.Create{Class}Request;
import {package}.model.Update{Class}Request;
import {package}.model.GeneralResponse;
import {package}.model.GeneralResponse{Class};
import {package}.model.GeneralResponse{Class}s;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
*@author {author}
*@since ${new Date()}
*/
@RestController
@RequestMapping("/{class}")
public class {Class}Controller {

    @Autowired
    {Class}Service {class}Service;

@RequestMapping(value = "/", method = RequestMethod.POST)
    public GeneralResponse{Class} create(@RequestBody Create{Class}Request requestBody) {
        return {class}Service.create{Class}(requestBody);
    }

@PutMapping(value="/{{class}Id}")
    public GeneralResponse update(@PathVariable long {class}Id, @RequestBody Update{Class}Request requestBody){
        return {class}Service.update{Class}({class}Id, requestBody);
    }

@DeleteMapping(value="/{{class}Id}")
    public GeneralResponse delete(@PathVariable long {class}Id){
        return {class}Service.delete{Class}({class}Id);
    }

@GetMapping(value="/{{class}Id}")
    public GeneralResponse{Class} fetchOne(@PathVariable long {class}Id){
        return {class}Service.get{Class}({class}Id);
    }

@GetMapping(value="/")
    public GeneralResponse{Class}s fetch(){
        return {class}Service.get{Class}s();
    }

}
`;

const serviceTemplate = `
package {package}

import {package}.model.{Class};
import {package}.repository.{Class}Repository;
import {package}.utils.ResponseCodes;
import {package}.utils.Create{Class}Request;
import {package}.utils.Update{Class}Request;
import {package}.utils.GeneralResponse;
import {package}.utils.GeneralResponse{Class};
import {package}.utils.GeneralResponse{Class}s;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

/**
*@author {author}
*@since ${new Date()}
*/
@Service
public class {Class}Service {

    @Autowired
    {Class}Repository {class}Repository;


    public @ResponseBody
    GeneralResponse{Class} create{Class}(Create{Class}Request requestBody) {
    {Class} new{Class} = new {Class}();
    GeneralResponse{Class} response = new GeneralResponse{Class}();

    // TODO set class properties
    // Example new{Class}.setName(requestBody.getName());

    {class}Repository.save(new{Class});

    response.setResponseCode(ResponseCodes.SUCCESS_CODE);
    response.setResponseMessage(ResponseCodes.SUCCESS_MESSAGE);
    response.set{Class}(new{Class});

    return response;
}

public @ResponseBody
GeneralResponse update{Class}(long id, Update{Class}Request requestBody) {
    {Class} {class} = {class}Repository.findById(id);
    GeneralResponse response = new GeneralResponse();

    if ({class} == null) {
        // response.setResponseCode(ResponseCodes.INVALID_CUSTOMER_CODE);
        // response.setResponseMessage(ResponseCodes.INVALID_CUSTOMER_MESSAGE);
        return response;
    } else {

        //TODO set fields here
        //Example {class}.setName(requestBody.getName());
        
        {class}Repository.save({class});

        response.setResponseCode(ResponseCodes.SUCCESS_CODE);
        response.setResponseMessage(ResponseCodes.SUCCESS_MESSAGE);
        return response;
    }
}

public @ResponseBody
GeneralResponse delete{Class}(long id) {

    // TODO find out if {class} disable is a better option than delete

    {Class} {class} = {class}Repository.findById(id);
    GeneralResponse response = new GeneralResponse();

    if ({class} == null) {
        response.setResponseCode(ResponseCodes.INVALID_CUSTOMER_CODE);
        response.setResponseMessage(ResponseCodes.INVALID_CUSTOMER_MESSAGE);
        return response;
    } else {

        {class}Repository.deleteById(id);

        response.setResponseCode(ResponseCodes.SUCCESS_CODE);
        response.setResponseMessage(ResponseCodes.SUCCESS_MESSAGE);
        return response;
    }
}

public @ResponseBody
GeneralResponse{Class}s get{Class}s() {

    Iterable<{Class}> {class}s = {class}Repository.findAll();

    GeneralResponse{Class}s response = new GeneralResponse{Class}s();
    response.setResponseCode(ResponseCodes.SUCCESS_CODE);
    response.setResponseMessage(ResponseCodes.SUCCESS_MESSAGE);
    response.set{Class}({class}s);

    return response;
}

public @ResponseBody
GeneralResponse{Class} get{Class}(long id) {

    {Class} {class} = {class}Repository.findById(id);
    GeneralResponse{Class} response = new GeneralResponse{Class}();

    if ({class} == null) {
        response.setResponseCode(ResponseCodes.INVALID_CUSTOMER_CODE);
        response.setResponseMessage(ResponseCodes.INVALID_CUSTOMER_MESSAGE);
        return response;
    } else {
        response.setResponseCode(ResponseCodes.SUCCESS_CODE);
        response.setResponseMessage(ResponseCodes.SUCCESS_MESSAGE);
        response.set{Class}({class});

        return response;

    }
}

}`;

const responseObjectTemplate = `
package {package}.model;

import {package}.model.{Class};
import lombok.Data;

@Data
public class General{Class}Response extends GeneralResponse {

    private {Class} {class};
    
}`;

const responseObjectsTemplate = `
package {package}.model;

import {package}.model.{Class};
import lombok.Data;

@Data
public class General{Class}sResponse extends GeneralResponse {

   private Iterable<{Class}> {class}s;

}`;

const responseTemplate = `
pacakge {package}

public class ResponseCodes {

    public static final String SUCCESS_CODE = "01";
    public static final String SUCCESS_MESSAGE = "Success";

    public static final String FAILURE_CODE = "100";
    public static final String FAILURE_MESSAGE = "Failure";

}`;

module.exports = {
    directories: ["utils", "model", "repository", "controller", "service", "utils/exceptions"],
    templates: {
        model: modelTemplate,
        controller: controllerTemplate,
        repository: repositoryTemplate,
        service: serviceTemplate,
        response: responseTemplate,
        responseObject: responseObjectTemplate,
        responseObjects: responseObjectsTemplate
    },
    paths: {
        model: 'model/{Class}.java',
        controller: 'controller/{Class}Controller.java',
        repository: 'repository/{Class}Repository.java',
        service: 'service/{Class}Service.java',
        response: 'model/ResponseCodes.java',
        responseObject: 'model/General{Class}Response.java',
        responseObjects: 'model/General{Class}sResponse.java',
    },
    database: {
        redux: {
            actions: {
                packageName: {
                    UPDATE_PACKAGE_NAME: "UPDATE_PACKAGE_NAME",
                    GET_PACKAGE_NAME: "GET_PACKAGE_NAME",
                    ADD_PACKAGE_NAME: "ADD_PACKAGE_NAME",
                    DELETE_PACKAGE_NAME: "DELETE_PACKAGE_NAME"
                },
                author: {
                    UPDATE_AUTHOR: "UPDATE_AUTHOR",
                    GET_AUTHOR: "GET_AUTHOR",
                    ADD_AUTHOR: "ADD_AUTHOR",
                    DELETE_AUTHOR: "DELETE_AUTHOR"
                },
                paramStructure: {
                    UPDATE_PARAM_STRUCTURE: "UPDATE_PARAM_STRUCTURE",
                    GET_PARAM_STRUCTURE: "GET_PARAM_STRUCTURE",
                    ADD_PARAM_STRUCTURE: "ADD_PARAM_STRUCTURE",
                    DELETE_PARAM_STRUCTURE: "DELETE_PARAM_STRUCTURE"
                },
                },
            defaults: {
                packageName: "com.itconsortiumgh.artifact",
                author: "John Dope",
                paramStructure: "Dog{String:name,long:id}.Cat{String:name,long :id,boolean:active}"
            }
        }
    }

};
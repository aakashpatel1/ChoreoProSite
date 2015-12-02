var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('My First Admin')
        .baseApiUrl('http://192.168.0.132:8080/'); // main API endpoint
    // create a choreographer entity
    var choreographers = nga.entity('choreographers');
    choreographers.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('name').isDetailLink(true),
        nga.field('bio')
    ]);
    choreographers.creationView().fields([
        nga.field('name'),
        nga.field('bio')
    ]);
    // use the same fields for the editionView as for the creationView
    choreographers.editionView().fields(choreographers.creationView().fields());
    admin.addEntity(choreographers)
    var pages = nga.entity('pages').identifier(nga.field('PageID'));
    pages.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('PageName').isDetailLink(true)
    ]);
    var pageAttributes = nga.entity('pageAttributes').identifier(nga.field('AttributeID'));
    admin.addEntity(pageAttributes);
    pages.showView().fields([
        nga.field('PageName'),
        nga.field('pageAttributes', 'referenced_list')
            .targetEntity(pageAttributes)
            .targetReferenceField(nga.field('PageID'))
            .targetFields([
                nga.field('PageID'),
                nga.field('AttributeName'),
                nga.field('AttributeText')
            ])
    ]);

    pages.editionView().fields([
        nga.field('pageAttributes', 'referenced_list')
            .targetEntity(pageAttributes)
            .targetReferenceField(nga.field('PageID'))
            .targetFields([
                nga.field('PageID'),
                nga.field('AttributeName'),
                nga.field('AttributeText')
            ])
    ]);

    admin.addEntity(pages);
    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addElementTransformer('choreographers/:id', function(element) {
        console.log(element);
        element = element[0];
        return element;
    });
}]);

myApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function() {
        return {
            request: function(config) {
                //Add id to Put Method
                console.log(config);
                //if (/choreographer\//.test(config.url) && config.params.filter && config.params.filter.id) {
                //    config.url = config.url.replace('choreographers', 'choreographers/' + config.params.filter.id);
                //    delete config.params.filter.id;
                //}
                return config;
            },
        };
    });
}]);
/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res) {
	    res.view();
	},
	'create': function(req, res, next) {
	    Customer.create(req.params.all(), function customerCreated(err, customer){
	        if (err) {
	        	console.log(err);
	        	req.session.flash = {
	        		err: err
	        	}
	        	return res.redirect('/customer/new/');
	        }
	        res.redirect('/customer/show/' + customer.id);
	    });
	},
	'show': function(req, res, next) {
	    // Customer.findOne(req.param('id'), function foundCustomer(err, customer){
	    Customer.findOne(req.param('id')).populateAll().exec(function(err, customer){
	        if (err) {
	            return next(err);
	        }
	        if (!customer) {
	            return next();
	        }
	        res.view({customer: customer});
	    });
	},
	'index': function(req, res, next) {
	    Customer.find(function foundCustomers(err, custmoers){
	        if (err) {
	            return next(err);
	        }
	        res.view({custmoers: custmoers});
	    });
	},
	'edit': function(req, res, next) {
	    Customer.findOne(req.param('id'), function foundCustomer(err, customer){
	        if (err) {
	            return next(err);
	        }
	        if (!customer) {
	            return next();
	        }
	        res.view({customer: customer});
	    });
	},
	'update': function(req, res, next) {
	    var id = req.param('id');
	    Customer.update(req.param('id'), req.params.all(), function customerUpdated(err){
	        if (err) {
	            res.redirect('/customer/edit/' + id);
	        }
	        res.redirect('/customer/show/' + id);
	    });
	},
	'destroy': function(req, res, next) {
	    Customer.destroy(req.param('id')).exec(function(err, customer){
	        res.redirect('/customer/');
	    });
	}
};


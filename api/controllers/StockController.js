/**
 * StockController
 *
 * @description :: Server-side logic for managing stocks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res) {
        Customer.findOne(req.param('owner'), function foundCustomer(err, customer){
            if (err) {
                return next(err);
            }
            if (!customer) {
                return next();
            }
            res.view({customer: customer});
        });
    },
    'create': function(req, res, next) {
        Stock.create(req.params.all(), function stockCreated(err, stock){
            if (err) {
                return next(err);
            }
            res.redirect('/customer/show/' + stock.owner);
        });
    },
    'show': function(req, res, next) {
        Stock.findOne(req.param('id'), function foundStock(err, stock){
            if (err) {
                return next(err);
            }
            res.view({stock: stock});
        });
    },
    'index': function(req, res, next) {
        Stock.find(function foundStocks(err, stocks){
            if (err) {
                return next(err);
            }
            res.view({stocks: stocks});
        });
    },
    'edit': function(req, res, next) {
        Stock.findOne(req.param('id'), function foundStock(err, stock){
            if (err) {
                return next(err);
            }
            if (!stock) {
                return next();
            }
            res.view({stock: stock});
        });
	},
	'update': function(req, res, next) {
	    Stock.update(req.param('id'), req.params.all(), function stockUpdated(err){
	        if (err) {
	            res.redirect('/stock/edit/' + stock.id);
	        }
	        res.redirect('/customer/show/' + stock.owner);
	    });
	},
	'destroy': function(req, res, next) {
	    Stock.destroy(req.param('id')).exec(function(err, stock){
	        res.redirect('/stock/');
	    });
	}
};
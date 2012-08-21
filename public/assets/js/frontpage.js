/**
 * Light Javascript "class" frameworking for you
 * to organize your code a little bit better.
 *
 * If you want more complex things, I'd suggest
 * importing something like Backbone.js as it
 * has much better abilities to handle a MVC
 * like framework including persistant stores (+1)
 *
 * @author  sjlu (Steven Lu)
 */
var Frontpage = function()
{
    /**
     * The exports variable is responsible for
     * storing and returning public functions
     * in the instantized class.
     */
    var exports = {};

    /**
     * Write your public functions like this.
     * Make sure you include it into the exports
     * variable.
     */
    function public_function() 
    {
        /**
         * Note that we can still call
         * private functions within the scope
         * of the "class".
         */
        private_function();
    }
    exports.public_function = public_function;

    /**
     * Private functions are very similar, they
     * just are not included in the exports 
     * function.
     */
     function private_function()
     {

     }

     /**
      * You may wanna have a init() function
      * to do all your bindings for the class.
      */
     function init()
     {

     }
     exports.init = init;

     /**
      * Last but not least, we have to return
      * the exports object.
      */
     return exports;
};
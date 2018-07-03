define([
    "N/log",
    "N/runtime",
    "N/ui/serverWidget"
], function (log, runtime, ui) {

    /**
     * Boilerplate to easily add a UI message.
     *
     * @author Felipe Chang <felipechang@hardcake.org>
     *
     * @NApiVersion 2.x
     * @NModuleScope SameAccount
     * @NScriptType UserEventScript
     */

    /**
     * Display a prompt if order has backordered items.
     *
     * @copyright 7/2/2018 Greenlane Inc.
     * @author Felipe Chang <fchang@gnln.com>
     *
     * @NApiVersion 2.x
     * @NModuleScope SameAccount
     * @NScriptType UserEventScript
     */

    /**
     * Message Constructor
     * @param {Object} context
     * @constructor
     */
    function MessagePrompt(context) {

        /**
         * Applicable contexts
         * @type {*[]}
         */
        var VALID_CONTEXT = [
            context["UserEventType"].EDIT,
            context["UserEventType"].VIEW
        ];

        /**
         * Message Input Object
         * @typedef {Object} msg - Container Object
         * @property {Object} label - Field Label
         * @property {Object} id - Field ID
         * @property {Object} message - Message
         */

        /**
         * Display text on screen
         * @param {msg} obj
         * @param {string} type
         * @private
         */
        function _showText(obj, type) {

            var isViewOrEdit = VALID_CONTEXT.indexOf(context.type) !== -1;
            var isUserInterface = runtime["executionContext"] === runtime.ContextType.USER_INTERFACE;

            if (isUserInterface && isViewOrEdit) {
                var field = context.form.addField({
                    id: obj.id,
                    label: obj.label,
                    type: ui.FieldType.INLINEHTML
                });
                type = type || "CONFIRMATION";
                field.defaultValue =
                    "<script type='application/javascript'>" +
                    "require(['N/ui/message'], function (message) {" +
                    "message.create({title: '" + obj.message + "', type: message.Type['" + type + "']}).show();" +
                    "});" +
                    "</script>";
            }
        }

        /**
         * Show Confirmation Message
         * @param {msg} obj
         */
        this.showConfirmation = function (obj) {
            _showText(obj, "CONFIRMATION");
        };

        /**
         * Show Information Message
         * @param {msg} obj
         */
        this.showInformation = function (obj) {
            _showText(obj, "INFORMATION");
        };

        /**
         * Show Warning Message
         * @param {msg} obj
         */
        this.showWarning = function (obj) {
            _showText(obj, "WARNING");
        };

        /**
         * Show Error Message
         * @param {msg} obj
         */
        this.showError = function (obj) {
            _showText(obj, "ERROR");
        };
    }

    return {

        /**
         * beforeLoad event handler.
         * @param {Object} context
         * @param {Record} context.newRecord - The new record being loaded
         * @param {string} context.type - The action type that triggered this event
         * @param {Form} context.form - The current UI form
         * @return {void}
         */
        beforeLoad: function (context) {


            try {

                //Build module
                var msg = new MessagePrompt(context);

                //Confirmation
                msg.showConfirmation({
                    label: "Confirmation Prompt",
                    id: "custpage_confirmation_prompt",
                    message: "This is a Confirmation prompt"
                });

                //Information
                msg.showInformation({
                    label: "Information Prompt",
                    id: "custpage_information_prompt",
                    message: "This is an Information prompt"
                });

                //Warning
                msg.showWarning({
                    label: "Warning Prompt",
                    id: "custpage_warning_prompt",
                    message: "This is a Warning prompt"
                });

                //Error
                msg.showError({
                    label: "Confirmation Prompt",
                    id: "custpage_error_prompt",
                    message: "This is an Error prompt"
                });
            }
            catch (e) {
                log.error("beforeLoad", e);
            }
        }
    };
});
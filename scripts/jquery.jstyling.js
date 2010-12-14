/**
 * jStyling - jQuery plugin for styling HTML elements
 * 
 * Copyright (c) 2010 Dmitry Avseyenko
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 1.0
 * @author Dmitry Avseyenko <polsad@gmail.com>
 */ 
(function ($) {
    /**
     * Init custom elements
     */
    $.jStyling = function(options) {
        $.jStyling.main.init(options);
    };
    /**
     * Init custom selects
     */
    $.jStyling.createSelect = function(data, options) {
        $.jStyling.main.createSelect(data, options);
    };
    /**
     * Update custom selects options
     */
    $.jStyling.updateSelect = function(data) {
        $.jStyling.main.updateSelect(data);
    };
    /**
     * Destroy custom selectbox
     */
    $.jStyling.destroySelect = function(data) {
        $.jStyling.main.destroySelect(data);
    };
    /**
     * Init custom checkboxes
     */
    $.jStyling.createCheckbox = function(data, options) {
        $.jStyling.main.createCheckbox(data, options);
    };
    /**
     * Update custom checkboxes
     */
    $.jStyling.updateCheckbox = function(data) {
        $.jStyling.main.updateCheckbox(data);
    };
    /**
     * Destroy custom checkboxes
     */
    $.jStyling.destroyCheckbox = function(data) {
        $.jStyling.main.destroyCheckbox(data);
    };
    /**
     * Init custom radio buttons
     */
    $.jStyling.createRadio = function(data, options) {
        $.jStyling.main.createRadio(data, options);
    };
    /**
     * Update custom radio buttons
     */
    $.jStyling.updateRadio = function(data) {
        $.jStyling.main.updateRadio(data);
    };    
    /**
     * Destroy custom radio buttons
     */
    $.jStyling.destroyRadio = function(data) {
        $.jStyling.main.destroyRadio(data);
    };
    /**
     * Create custom file input
     */         
    $.jStyling.createFileInput = function(data, options) {
        $.jStyling.main.createFileInput(data, options);
    };
    /**
     * Destroy custom file input
     */         
    $.jStyling.destroyFileInput = function(data) {
        $.jStyling.main.destroyFileInput(data);
    };
	/*
	 * Chained function to create custom elements
	 */    
	$.fn.jStyling = function(options) {
		return $.jStyling(options);
	};    
    /**
     * jStyling settings
     * 
     * selectClass {
     *     'w' - select wrapper class
     *     's' - selected item class
     *     'l' - options list class 
     *     't' - selected item text class       
     * },
     * checkboxClass - checkboxes class
     * radioClass - radio button class
     * fileClass {
     *     'w' - file input wrapper class
     *     'f' - filename class
     *     'b' - button class           
     * }
     * fileButtonText - text on button                  
     */
    $.jStyling.settings = {  
        selectClass: {
            'w' : 'jstyling-select',
            's' : 'jstyling-select-s',
            'l' : 'jstyling-select-l',
            't' : 'jstyling-select-t'
        },
        checkboxClass: 'jstyling-checkbox',
        radioClass: 'jstyling-radio',
        fileClass: {
            'w' : 'jstyling-file',
            'f' : 'jstyling-file-f',
            'b' : 'jstyling-file-b'
        },
        fileButtonText: 'Browse'
    };
    
    $.jStyling.customOptions = {};
    /**
     * jcusel main object
     */
    $.jStyling.main = {
        init: function(options) {
            $.extend($.jStyling.settings, options || {});
        },
        checkType: function(el, type) {
            var res = $(el).is(type) ? true : false;
            return res;
        },
        createSelect: function(data, options) {
            $.jStyling.customOptions = (options) ? options : {};
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'select')) {
                    return false;
                }
                if ($(this).parent().is('.'+$.jStyling.settings.selectClass.w)) {
                    return false;
                }
                var self = this;
                /**
                 * Create wrapper div
                 */
                var wDiv = $('<div>').addClass($.jStyling.settings.selectClass.w);
                /**
                 * Set css or manual select width
                 */
                if ($(self).attr('disabled')) {
                    wDiv.addClass('disabled');
                }
                if ($.jStyling.customOptions.extraClass) {
                    $(wDiv).addClass($.jStyling.customOptions.extraClass);
                }
                /**
                 * Create div containing current option value
                 */
                var sDiv = $('<div>').addClass($.jStyling.settings.selectClass.s);
                var tDiv = $('<div>').addClass($.jStyling.settings.selectClass.t);
                /**
                 * Cleate list vith options value
                 */
                var options = $(self).find('option');
                var html = '<div class="'+$.jStyling.settings.selectClass.l+'">';
                for (var i = 0; i < options.length; i++) {
                    var itemclass = ($(options[i]).attr('disabled')) ? 'item-'+$(options[i]).val()+' disabled' : 'item-'+$(options[i]).val();
                    html = html + '<div class="'+itemclass+'">'+$(options[i]).html()+'</div>';
                }
                html = html + '</div>';
                tDiv.html($(self).find('option:selected').html());
                /**
                 * Append elements and set default option
                 */
                wDiv.append(html).append(sDiv);
                sDiv.append(tDiv);
                $(self).before(wDiv).hide();
                $(wDiv).append(self);
                /**
                 * Define list item click event
                 */
                $(wDiv).find('.'+$.jStyling.settings.selectClass.l+' div').bind('click', function() {
                    if (! $(this).is('.disabled')) {
                        var id = $(this).attr('class').replace('item-','').replace(' disabled','');
                        var el = $(self).find('option[value="'+id+'"]');
                        // Set selected item in select element
                        $(self).get(0).selectedIndex = parseInt($(el).index());
                        $(self).trigger('change');
                        // Set selected value
                        tDiv.html($(el).html());
                    }
                });
                /**
                 * Define wrapper click event
                 */
                wDiv.bind('click', function() {
                    // If select not disabled
                    if (!$(this).find('select').attr('disabled')) {
                        var status = $(this).is(' .active');
                        // Hide all opened selectbox
                        if (false == status) {
                            $('.' + $.jStyling.settings.selectClass.l+':visible').parent().removeClass('active');
                        }
                        // Toggle class
                        $(this).toggleClass('active');
                        if (false == status) {
                            $(document).unbind('click.closeSelect').bind('click.closeSelect', function(e) {
                                var target = e.target;
                                var list = $('.' + $.jStyling.settings.selectClass.l+':visible').parent().find('*').andSelf();
                                if ($.inArray(target, list) < 0) {
                                    $('.'+$.jStyling.settings.selectClass.w).removeClass('active');
                                    $(document).unbind('click.closeSelect');
                                }
                            });
                        }
                    }
                });
            });
        },
        updateSelect: function(data) { 
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'select')) {
                    return false;
                }            
                if ($(this).parent().is('.'+$.jStyling.settings.selectClass.w)) {
                    var self = this;
                    if ($(self).attr('disabled')) {
                        $(self).parent().addClass('disabled');   
                    }
                    else {
                        $(self).parent().removeClass('disabled'); 
                    }
                    var sDiv = $(self).parent().find('.'+$.jStyling.settings.selectClass.s);
                    var tDiv = $(sDiv).find('.'+$.jStyling.settings.selectClass.t);
                    var lDiv = $(self).parent().find('.'+$.jStyling.settings.selectClass.l);
                    var options = $(self).find('option');
                    var html = '';
                    for (var i = 0; i < options.length; i++) {  
                        var itemclass = ($(options[i]).attr('disabled')) ? 'item-'+$(options[i]).val()+' disabled' : 'item-'+$(options[i]).val();
                        html = html + '<div class="'+itemclass+'">'+$(options[i]).html()+'</div>';
                    }
                    $(lDiv).html(html);
                    /**
                     * Define list item click event
                     */
                    $(lDiv).find(' div').unbind('click').bind('click', function() {
                        if (! $(this).is('.disabled')) {
                            var id = $(this).attr('class').replace('item-','').replace(' disabled','');
                            var el = $(self).find('option[value="'+id+'"]');
                            /**
                             * Set selected item in select element
                             */                                                         
                            $(self).get(0).selectedIndex = parseInt($(el).index());
                            $(self).trigger('change');
                            $(tDiv).html(el.html());
                        }
                    });
                    $(tDiv).html($(self).find('option:selected').html());
                }
            });
        },
        destroySelect: function(data) {
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'select')) {
                    return false;
                }             
                if ($(this).parent().is('.'+$.jStyling.settings.selectClass.w)) {
                    var self = this;
                    var wDiv = $(self).parent();
                    $(document).unbind('click.closeSelect');
                    $(wDiv).before($(self));
                    $(wDiv).remove();
                    $(self).show();
                }
            });
        },
        createCheckbox: function(data, options) {
            $.jStyling.customOptions = (options) ? options : {};
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=checkbox]')) {
                    return false;
                }            
                if ($(this).parent().is('.'+$.jStyling.settings.checkboxClass)) {
                    return false;
                }
                var self = this;
                var aclass = ($(self).is(':checked')) ? ' active' : '';
                var dclass = ($(self).attr('disabled')) ? ' disabled' : '';
                /**
                 * Create wrapper div
                 */                                 
                var wDiv = $('<div>').addClass($.jStyling.settings.checkboxClass + aclass + dclass);                
                if ($.jStyling.customOptions.extraClass) {
                    $(wDiv).addClass($.jStyling.customOptions.extraClass);
                }
                $(self).before(wDiv);
                $(wDiv).append(self);                
                /**
                 * Define click events
                 */ 
                $(self).bind('click.checkboxClick', function(e) {
                    $(self).parent().toggleClass('active');
                }); 
                $(wDiv).bind('click', function(e) {
                    if ($(this).is('.disabled') == false && ! $(e.target).is('input[type=checkbox]')) {
                       $(self).trigger('click');
                    }                    
                });
            });
        },
        updateCheckbox: function(data) {
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=checkbox]')) {
                    return false;
                }             
                if ($(this).parent().is('.'+$.jStyling.settings.checkboxClass)) {
                    var self = this;
                    var aclass = ($(self).is(' :checked')) ? ' active' : '';
                    var dclass = ($(self).attr('disabled')) ? ' disabled' : '';
                    $(self).parent().removeClass('active disabled').addClass(aclass + dclass);
                }
            });
        },
        destroyCheckbox: function(data) {
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=checkbox]')) {
                    return false;
                }            
                if ($(this).parent().is('.'+$.jStyling.settings.checkboxClass)) {
                    var self = this;
                    var wDiv = $(self).parent();
                    $(self).unbind('click.checkboxClick');
                    $(wDiv).before($(self));
                    $(wDiv).remove();
                }
            });
        },
        createRadio: function(data, options) {
            $.jStyling.customOptions = (options) ? options : {};
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=radio]')) {
                    return false;
                }            
                if ($(this).parent().is('.'+$.jStyling.settings.radioClass)) {
                    return false;
                }
                var self = this;
                var aclass = ($(self).is(':checked')) ? ' active' : '';
                var dclass = ($(self).attr('disabled')) ? ' disabled' : '';
                /**
                 * Create wrapper div
                 */ 
                var wDiv = $('<div>').addClass($.jStyling.settings.radioClass + aclass + dclass);
                if ($.jStyling.customOptions.extraClass) {
                    $(wDiv).addClass($.jStyling.customOptions.extraClass);
                }                
                $(self).before(wDiv);
                $(wDiv).append(self);
                /**
                 * Define click events
                 */
                $(self).bind('click.radioClick', function(e) {
                    $('input[type=radio][name='+$(self).attr('name')+']').parent().removeClass('active');
                    $(self).parent().addClass('active');
                }); 
                $(wDiv).bind('click', function(e) {
                    if ($(this).is('.disabled') == false && ! $(e.target).is('input[type=radio]')) {
                       $(self).trigger('click');
                    }
                });  
            });
        },
        updateRadio: function(data) {
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=radio]')) {
                    return false;
                }               
                if ($(this).parent().is('.'+$.jStyling.settings.radioClass)) {
                    var self = this;
                    var aclass = ($(self).is(':checked')) ? ' active' : '';
                    var dclass = ($(self).attr('disabled')) ? ' disabled' : '';
                    $(self).parent().removeClass('active disabled').addClass(aclass + dclass);
                }
            });
        },        
        destroyRadio: function(data) {
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=radio]')) {
                    return false;
                }               
                if ($(this).parent().is('.'+$.jStyling.settings.radioClass)) {
                    var self = this;
                    var wDiv = $(self).parent();
                    $(self).unbind('click.radioClick');
                    $(wDiv).before($(self));
                    $(wDiv).remove();
                }
            });
        },
        createFileInput: function(data, options) {
            $.jStyling.customOptions = (options) ? options : {};
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=file]')) {
                    return false;
                }               
                if (! $(this).parent().parent().is('.'+$.jStyling.settings.fileClass.w)) {
                    var self = this;
                    /**
                     * Create wrapper div
                     */
                    var wDiv = $('<div>').addClass($.jStyling.settings.fileClass.w);
                    /**
                     * Create filename div
                     */                    
                    var fDiv = $('<div>').addClass($.jStyling.settings.fileClass.f);
                    /**
                     * Create button div
                     */                    
                    var bDiv = $('<div>').addClass($.jStyling.settings.fileClass.b);
                    /**
                     * Add extra class
                     */
                    if ($.jStyling.customOptions.extraClass) {
                        $(wDiv).addClass($.jStyling.customOptions.extraClass);
                    } 
                    /**
                     * Set button text
                     */                                         
                    if ($.jStyling.customOptions.fileButtonText) {
                        $(bDiv).html($.jStyling.customOptions.fileButtonText);
                    }
                    else {
                        $(bDiv).html($.jStyling.settings.fileButtonText);
                    }
                    /**
                     * Set default file
                     */                                         
                    if ($(self).val() != '') {
                        $(fDiv).html($(self).val());
                    }                    
                    
                    $(wDiv).append(fDiv).append(bDiv);
                    $(self).before(wDiv);
                    $(bDiv).append($(self));
                    
                    var h = $(bDiv).outerHeight();
    
                    $(self).css({'height':h+'px','font-size':h+'px'}).bind('change', function() {
                        $(this).parent().prev().html($(self).val());
                    });
                }
            });
        },
        destroyFileInput: function(data) {
            return data.each(function() {
                /**
                 * Check type
                 */                                 
                if (! $.jStyling.main.checkType(this, 'input[type=file]')) {
                    return false;
                }             
                if ($(this).parent().parent().is('.'+$.jStyling.settings.fileClass.w)) {
                    var self = this;
                    var wDiv = $(self).parent().parent();
                    $(wDiv).before($(self));
                    $(wDiv).remove();
                    $(self).removeAttr('style');
                }
            });        
        }
    };
})(jQuery);
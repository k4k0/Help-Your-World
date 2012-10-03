/**
 * @package		Gantry Template Framework - RocketTheme
 * @version		1.6.8 August 14, 2012
 * @author		RocketTheme http://www.rockettheme.com
 * @copyright 	Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license		http://www.rockettheme.com/legal/license.php RocketTheme Proprietary Use License
 */

window.addEvent('domready', function() {
	var moo1 = (MooTools.version == '1.12' || MooTools.version == '1.11');
	var header = (moo1) ? $('rt-header-surround') : document.id('rt-header-surround');
	var ie6 = (moo1) ? window.ie6 : Browser.Engine.trident4;
	var ie7 = (moo1) ? window.ie7 : Browser.Engine.trident5;
	
	if (header && !ie6) {
		var height = header.getCoordinates().height;
		if (ie7) height -= header.getFirst().getStyle('padding-bottom').toInt();
		
		var lastdiv = new Element('div', {
			'styles': {
				'height': height
			}
		});

		if (moo1) lastdiv.setHTML('&nbsp;');
		else lastdiv.set('html', '&nbsp;');

		lastdiv.inject(header, 'before');
	}
});
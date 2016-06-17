module.exports = {
	getSmallHtml: function() {
		return '<html><head></head><body></body></html>';
	},
	getFullHtml: function() {
		return '<html> \
			<head></head> \
			<body> \
			<h2 id="possible-errors">Possible Errors</h2>\
			<p>The following rules point out areas where you might have made mistakes.</p>\
			<ul>\
			<li><a href="comma-dangle">comma-dangle</a> - disallow or enforce trailing commas <span title="recommended" aria-label="recommended" class="glyphicon glyphicon-ok"></span></li>\
			<li><a href="no-cond-assign">no-cond-assign</a> - disallow assignment in conditional expressions <span title="recommended" aria-label="recommended" class="glyphicon glyphicon-ok"></span></li>\
			<li><a href="no-console">no-console</a> - disallow use of <code class="highlighter-rouge">console</code> <span title="recommended" aria-label="recommended" class="glyphicon glyphicon-ok"></span></li>\
			<li><a href="no-constant-condition">no-constant-condition</a> - disallow use of constant expressions in conditions <span title="recommended" aria-label="recommended" class="glyphicon glyphicon-ok"></span></li>\
			<li><a href="no-control-regex">no-control-regex</a> - disallow control characters in regular expressions <span title="recommended" aria-label="recommended" class="glyphicon glyphicon-ok"></span></li>\
			</ul>\
			<h2 id="best-practices">Best Practices</h2>\
			<p>These are rules designed to prevent you from making mistakes. They either prescribe a better way of doing something or help you avoid footguns.</p>\
			<ul>\
			<li><a href="accessor-pairs">accessor-pairs</a> - Enforces getter/setter pairs in objects</li>\
			<li><a href="array-callback-return">array-callback-return</a> - Enforces return statements in callbacks of array’s methods</li>\
			<li><a href="block-scoped-var">block-scoped-var</a> - treat <code class="highlighter-rouge">var</code> statements as if they were block scoped</li>\
			<li><a href="consistent-return">consistent-return</a> - require <code class="highlighter-rouge">return</code> statements to either always or never specify values</li>\
			</ul>\
			<h2 id="variables">Variables</h2>\
			<p>These rules have to do with variable declarations.</p>\
			<ul>\
			<li><a href="init-declarations">init-declarations</a> - enforce or disallow variable initializations at definition</li>\
			<li><a href="no-catch-shadow">no-catch-shadow</a> - disallow the catch clause parameter name being the same as a variable in the outer scope</li>\
			<li><a href="no-delete-var">no-delete-var</a> - disallow deletion of variables <span title="recommended" aria-label="recommended" class="glyphicon glyphicon-ok"></span></li>\
			</ul>\
			</body> \
			</html>';
	}
};

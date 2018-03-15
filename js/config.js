require.config({
	baseUrl : "/",
	paths : {
		jquery : "/pc/lib/jquery/jquery-3.3.1.min",
		cookie : "/pc/lib/jquery_plugins/jquery.cookie",
		zoom : "/pc/lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		carousel : "/pc/lib/jquery_plugins/jquery.xmcarousel",
		template:"/pc/lib/template/template",
		bootstrap:"/pc/lib/bootstrap/js/bootstrap.min",
		ui:"/pc/lib/jqueryui/jquery-ui.min",
		zoom:"/pc/lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		load : "/pc/js/load"
	},
	shim : {
		carousel : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		}
	}
});
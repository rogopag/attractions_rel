from django.conf.urls.defaults import patterns, include, url
from sample.views import AjaxView
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
	url(r'^ajax', AjaxView.as_view(), name="ajax"),
	url(r'^$', 'attractions_rel.views.home', name='home'),
	url(r'^cities', 'attractions_rel.views.cities', name='cities'),
	# url(r'^attractions/', include('attractions.foo.urls')),

	# Uncomment the admin/doc line below to enable admin documentation:
	# url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

	# Uncomment the next line to enable the admin:
	url(r'^admin/', include(admin.site.urls)),
)

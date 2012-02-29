# Create your views here.
from attractions_rel.settings import ROOT_PATH
from django.http import HttpResponse
from django.template import Context, loader, RequestContext
from django.utils import simplejson as json
from attractions_rel.models import DataWorker
from pprint import pprint

def home(request):
	t = loader.get_template(ROOT_PATH+'/templates/index.html')
	c = RequestContext(request, {
		
	})
	return HttpResponse(t.render(c))
	

def cities(request):
	if request.is_ajax():
		if request.method == 'GET':
			message = "This is an XHR GET request"
		elif request.method == 'POST':
			worker = DataWorker()
			message = "This is a XHR POST request"
			#print str(worker.wmin) +" "+ str(worker.wmax)
			response = json.dumps( worker.data )
		else:
			message = "No XHR"
		return HttpResponse( response, 'application/json' )
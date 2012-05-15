# Create your views here.
from attractions_rel.settings import ROOT_PATH
from django.http import HttpResponse
from django.template import Context, loader, RequestContext
from django.utils import simplejson as json
from collections import defaultdict
#import operator
import csv
#import datetime
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


class DataWorker(dict):
	
	data = {}
	
	def __init__(self):
		 self.loadCsv()
		 
	def loadCsv(self):
		try:
			rows = list(csv.reader(open('data/geocoded_town.csv', "rU")))
		except IOError, e:
			print e, "Couldn't load file"	
		#rows = sorted( rows, key=operator.itemgetter(3) )
		self.data = map(self.fixData, rows)
		
	def fixData( self, r):
		data = defaultdict(list)
		data[r[0]].append( float(r[1]) )
		data[r[0]].append( float(r[2]) )
		data[r[0]].append( float(r[3]) )
		data[r[0]].append( int( ( float(r[3]) * 255 ) / 100 ) )
		return data
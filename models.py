from django.db import models
from collections import defaultdict
import operator
import csv
#import datetime
from pprint import pprint

class DataWorker(models.Model):
	
	data = {}
	
	def __init__(self):
		 self.loadCsv()
		 
	def loadCsv(self):
		try:
			rows = list(csv.reader(open('data/geocoded_town.csv', "rU")))
		except IOError, e:
			print e, "Couldn't load file"	
		rows =  sorted( rows, key=operator.itemgetter(3) ) 
		self.data = map(self.fixData, rows[120:140])
		
	def fixData( self, r):
		data = defaultdict(list)
		data[r[0]].append( float(r[1]) )
		data[r[0]].append( float(r[2]) )
		data[r[0]].append( float(r[3]) )
		data[r[0]].append( int( ( float(r[3]) * 255 ) / 100 ) )
		return data
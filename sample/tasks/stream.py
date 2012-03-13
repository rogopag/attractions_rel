from celery.contrib.abortable import Task
from celery.registry import tasks
from sample.scripts.stream import StreamManage
from pprint import pprint

class StreamTask(Task):
	
	sm = None
	th = None
	
	def __init__(self):
		pass
		
	def run(self, coords, **kwargs):
		try:
			print "StreamTask ::: Stream already instantiated, %s" % coords['stop']
			try:
				self.th = self.sm.stream(coords, obj = self.th)
			except AttributeError, e:
				print "StreamTask ::: the asshole is not an instance %s" % e
				self.retry(args = [coords], exc=e, countdown=30, kwargs=kwargs)
		except KeyError, e:				
			print "StreamTask ::: Stream instantiated, for exception %s" % e
			self.sm = StreamManage()
			self.th = self.sm.stream(coords)
		print "From sample.task  Task is %s" % self.request.id + " the returned result from script called is %s" % self.th + " instance of Straming is %s" % self.sm
		return 'task executed'
		
tasks.register(StreamTask)
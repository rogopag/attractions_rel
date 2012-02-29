from celery.task import Task
from celery.registry import tasks
from pprint import pprint

class Stream(Task):
	def run(self, **kwargs):
		pprint(kwargs)

tasks.register(Add)
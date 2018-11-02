import sys
from urllib3 import PoolManager
#from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls import url
from django.http import HttpResponse

settings.configure(
    DEBUG=True,
    SECRET_KEY="this_secret_key_is_a_joke",
    ROOT_URLCONF=__name__,
    MIDDLEWARE_CLASSES=(
        'django.middleware.common.CommonMiddleware',
        #'django.middleware.csrf.CsrfViewMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ),
)

http = PoolManager()

def index(request, path):
    if "dist" in sys.argv:
        if path == "":
            path = "index.html"
        with open("../dist/%s" % path) as f:
            r = f.read()
        return HttpResponse(r)
    else:
        if path != "":
            path = "/" + path
        r = http.request("GET", "http://localhost:4200%s" % path, body=request.body)    
        return HttpResponse(r.data)

#@csrf_exempt
def elastic(request, path):
    print(path)
    r = http.request("GET", "http://localhost:9200%s" % path, body=request.body)
    return HttpResponse(r.data, content_type="text/plain")

def element(request):
    return HttpResponse("<div><p>Sehr gut!!!!!!!!!!!!!!!!!!!</p></div>")

def api(request, path):
    print(path)
    r = http.request("GET", "https://data.soep.de/api%s" % path, body=request.body)
    return HttpResponse(r.data, content_type="text/plain")

urlpatterns = (
    url(r'^api(?P<path>.*)$', api),
    url(r'^elastic(?P<path>.*)$', elastic),
    url(r'^api', element),
    url(r'^(?P<path>.*)$', index),
)

if __name__ == "__main__":
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)

"""
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# For creating Token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # make sure frontend always above backends
    path('', include('C_frontend.urls')),

    path('', include("B1_orders.urls")),
    
    path('admin/', admin.site.urls),
    path('', include("B_workers.urls")),
    
    path('', include("B2_menu.urls")),

    path('', include("D_videos.urls")),


]

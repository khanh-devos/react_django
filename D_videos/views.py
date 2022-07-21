from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from . import models as Dmod
from E_videos import models as Emod
from . import serializer as seris

import threading
import random
import time
import multiprocessing as MULTI


# Create your views here.
class VideoVS(viewsets.ModelViewSet):
    queryset = Dmod.Video.objects.all()
    serializer_class = seris.VideoSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]

    def get_queryset(self):

        return super().get_queryset()

# Create your views here.


class ThreadWithResult(threading.Thread):
    def __init__(self, group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None):
        def function():
            self.result = target(*args, **kwargs)
        super().__init__(group=group, target=function, name=name, daemon=daemon)


def get(a):
    result = a.objects.all()
    return result


def get2(a, store):
    for item in a.objects.all():
        store.append(item)


class CombineVideoVS(viewsets.ModelViewSet):
    #queryset = Emod.EVideo.objects.all()
    serializer_class = seris.VideoSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]

    def get_queryset(self):
        # USING THREAD
        # WE CANNOT STOP THREAD SO SELECTING THEM RANDOMLY

        th1 = ThreadWithResult(target=get, args=(Dmod.DVideo,))
        th2 = ThreadWithResult(target=get, args=(Emod.EVideo,))
        th1.name = "th1"
        th1.start()
        th2.name = "th2"
        th2.start()

        th1.join()
        th2.join()

        print(random.randrange(0, 9) % 2)
        # print(time.localtime().tm_sec%2)

        if random.randrange(0, 99) % 2 == 0:
            return th1.result
        else:
            return th2.result

        #####################################################################
        # BECAUSE THREAD IS_ALIVE() DOES NOT WORK WITH REST FRAMEWORK
        # SO WE HAVE TO USE PROCESS,
        # THOUGH IT IS SAID THAT SLOWER BUT WE CAN TERMINATE OTHER PROCESSES
        # EFFICEIENCY NEEDS TO CHECK FOR REAL BUT PROCESS LOOKS UNDER CONTROL BETTER

        # store1 = MULTI.Manager().list()
        # store2 = MULTI.Manager().list()

        # p1 = MULTI.Process(target=get2, args=(Dmod.DVideo, store1))
        # p2 = MULTI.Process(target=get2, args=(Emod.EVideo, store2))

        # p1.start()
        # p2.start()

        # while p1.is_alive() or p2.is_alive():

        #     if not p1.is_alive():
        #         print(f"\n PROCESS P1 FINISHED !! \n")

        #         p2.terminate()
        #         #time.sleep(0.1)    #We need a small time for TERMINATION
        #         if p2.is_alive():
        #             print(f"\n PROCESS P2 TERMINATED !! \n")

        #         return store1

        #     if not p2.is_alive():
        #         print(f"\n PROCESS P2 FINISHED !! \n")

        #         p1.terminate()
        #         #time.sleep(0.1)    #We need a small time for TERMINATION
        #         if p1.is_alive():
        #             print(f"\n PROCESS P1 TERMINATED !! \n")

        #         return store2

        # p1.join()
        # p2.join()
